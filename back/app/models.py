from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "Users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), index=True)
    email = Column(String(50), unique=True, index=True)


class Peliculas(Base):
    __tablename__ = "Peliculas" 
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), index=True)
    director = Column(String(100), index=True)
    año = Column(String(10), index=True)
