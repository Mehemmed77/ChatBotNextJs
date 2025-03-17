from datetime import timedelta, datetime
from fastapi import Response
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from starlette import status
from backend.database import SessionLocal
from backend.models import Users
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import jwt, JWTError
from fastapi import Request

router = APIRouter(
    prefix = "/auth",
    tags = ["auth"]
)

SECRET_KEY = "bfb00df5dfd4029b2295590cbaf3a1a4c9c98bc42d60985b7789ed1fda64c6b860d022f26b3534ff1bfbddf69fb4f85ba57e2ca13abb83317eb756080a58d1262194d228d22be9476a0f4d6fa6651d869d7dbef61318dc69edcc2adf44d56e45d7ff30f7140c7337ca34be6f896811a39489b6a47280b337ab2a4ba6790cb831c16496c59723323391b13a010ae0c4912ba5795723d0e89dd5de8a0a9d28f19bdd72ec390d0e5574cb5f3376949bb84d56a484572c8304b1e2c645e7ec31f1760fe3ab91be711034a01cd81678106064589d51ca53a79580be0b181fc3897ad1517167ecf563fd492dbbf98d9199e497bd5162f8bf65c6bb3c800d8e7784603e"
ALGORITHM = "HS256"
bcrypt_context = CryptContext(schemes = ["bcrypt"], deprecated = "auto")

oauth2_bearer = OAuth2PasswordBearer(tokenUrl = "auth/token")

class CreateUserRequest(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

def authenticate_user(username: str, password: str, db):
    user = db.query(Users).filter(Users.username == username).first()
    if not user:
        return False
    if not bcrypt_context.verify(password, user.password):
        return False
    return user

def create_access_token(username: str, user_id: int, expired_delta: timedelta):
    encode = {"sub": username, "id": user_id}
    expires = datetime.utcnow() + expired_delta
    encode.update({"exp": expires})
    return jwt.encode(encode, SECRET_KEY, algorithm = ALGORITHM)


@router.post("/", status_code = status.HTTP_201_CREATED)
async def create_user(db : db_dependency, create_user_request: CreateUserRequest):
    create_user_db = Users(username = create_user_request.username, password = bcrypt_context.hash(create_user_request.password))
    db.add(create_user_db)
    db.commit()


@router.post("/token", response_model = Token)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: db_dependency, response: Response):
    user = authenticate_user(form_data.username, form_data.password, db)

    if not user:
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "User does not exist or could not validate")
    token = create_access_token(user.username, user.id, timedelta(minutes = 20))

    response.set_cookie("access_token", value = token, httponly = True, secure=True, samesite="Strict")

    return {"access_token": token, "token_type": "bearer"}


async def get_current_user(request: Request, token: Annotated[str, Depends(oauth2_bearer)] = None):
    print("yes")
    try:
        if token is None:
            token = request.cookies.get("access_token")

        if not token:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Could not validate user.",)

        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        user_id = payload.get("id")

        if not all([username, user_id]):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate user.",
            )

        return {"username": username, "id": user_id}
    except JWTError:
        print(token)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate user.",
        )


@router.get("/is-authenticated")
async def is_authenticated_user(request: Request, token: Annotated[str, Depends(oauth2_bearer)] = None):
    try:
        if token is None:
            token = request.cookies.get("access_token")

        if not token:
            return {"is_authenticated": False}

        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        user_id = payload.get("id")

        if not username or not user_id:
            return {"is_authenticated": False}

        return {"is_authenticated": True, "username": username, "id": user_id}

    except JWTError:
        return {"is_authenticated": False}