from fastapi import FastAPI, HTTPException, Depends, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import backend.models as models
from backend.database import engine, SessionLocal
from starlette import status
from typing import Annotated
from sqlalchemy.orm import Session
from backend.auth import router
from backend.auth import get_current_user

app = FastAPI()
models.Base.metadata.create_all(bind = engine)

origins = [
    "http://localhost:3000",  # Allow frontend running on localhost:3000
    "http://127.0.0.1:3000",  # Allow frontend running on 127.0.0.1:3000
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router = router)

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

@app.post("/backend/recieve_msg")
async def recieve_msg(message: Message):
    res = False
    if message.user_message and message.bot_response:
        res = True
    return {"response": res}

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]

@app.get("/check_user")
async def user(user: user_dependency):
    print("Route /check_user is being called")
    return {"user": user}
