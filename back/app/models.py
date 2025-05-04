from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from app.database import Base


Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), index=True)
    email = Column(String(50), unique=True, index=True)
    documento = Column(Integer, unique=True, index=True)
