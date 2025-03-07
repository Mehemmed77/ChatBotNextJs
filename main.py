# fastapi_app.py
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from backend.authentication import get_current_user
from backend.jwt import create_access_token, decode_access_token
import backend.models as models
from backend.database import engine, SessionLocal
from typing import Annotated
from sqlalchemy.orm import Session

from backend.password_hashing import hash_password, verify_password

app = FastAPI()
models.Base.metadata.create_all(bind = engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    user_message: str
    bot_response: str

class UsersBase(BaseModel):
    username: str
    password: str

class ChatsBase(BaseModel):
    user_message: str
    bot_response: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/current_user")
def current_user(user: models.Users = Depends(get_current_user)):
    return {"id": user.id, "username": user.username}   

@app.post("/backend/recieve_msg")
async def recieve_msg(message: Message):
    res = False
    if message.user_message and message.bot_response:
        res = True
    return {"response": res}

@app.post("/signup")
def signup(user: UsersBase, db: Session = Depends(get_db)):
    existing_user = db.query(models.Users).filter(models.Users.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    hashed_password = hash_password(user.password)
    new_user = models.Users(username=user.username, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully"}

@app.post("/login", response_model=TokenResponse)
def login(user: UsersBase, db: Session = Depends(get_db)):
    db_user = db.query(models.Users).filter(models.Users.username == user.username).first()
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token({"sub": db_user.username})
    print(access_token)
    print(decode_access_token(access_token))
    return {"access_token": access_token, "token_type": "bearer"}
