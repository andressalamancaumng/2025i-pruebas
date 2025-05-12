from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Carro(Base):
    __tablename__ = "Carros"

    id = Column(Integer, primary_key=True, index=True)
    modelo= Column(Integer)
    marca = Column(String(50), index=True)
    serie = Column(String(50), unique=True, index=True)
