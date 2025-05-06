from sqlalchemy import Column, Integer, String
from .database import Base

class Carro(Base):
    __tablename__ = "carros"

    id = Column(Integer, primary_key=True, index=True)
    modelo = Column(Integer, nullable=False)
    marca = Column(String(255), nullable=False)
    serie = Column(String(255), nullable=False)

