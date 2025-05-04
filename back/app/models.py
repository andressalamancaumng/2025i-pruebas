from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), index=True)
    email = Column(String(50), unique=True, index=True)

class Carros(Base):
    __tablename__ = "Carros"

    id = Column(Integer, primary_key=True, index=True)
    modelo = Column(Integer, index=True)
    marca = Column(String(20), index=True)
    serie = Column(String(20), index=True)