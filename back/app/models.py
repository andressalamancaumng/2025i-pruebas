from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Carros(Base):
    __tablename__ = "carros"

    id = Column(Integer, primary_key=True, index=True)
    marca = Column(String(100),index = True)
    modelo = Column(Integer,index = True)
    serie = Column(String(100),index = True)
    
