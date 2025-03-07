from sqlalchemy import Column, ForeignKey, String, Integer
from .database import Base

class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key = True, index = True)
    username = Column(String, unique = True, index = True, nullable = False)
    password = Column(String, nullable = False, index = False)

class Chats(Base):
    __tablename__ = "chats"

    id = Column(Integer, primary_key = True, index = True)
    user_id = Column(Integer, ForeignKey("user.id"), index = True)
    user_message = Column(String, index = True)
    chat_response = Column(String, index = True)
