# fastapi_app.py
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

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

@app.post("/backend/recieve_msg")
async def recieve_msg(message: Message):
    print("SJJDSJKKDSJ")
    res = False
    if message.user_message and message.bot_response:
        res = True
    return {"response": res}

@app.get("/fastapi/hello")
def read_root():
    return {"message": "Hello from FastAPI"}