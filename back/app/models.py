from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), index=True)
    correo = Column(String(50), unique=True, index=True)
    documento = Column(String, unique=True, index=True)  # <- Campo nuevo
