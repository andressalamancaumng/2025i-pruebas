from sqlalchemy import Column, Integer, String
from .database import Base

class Carro(Base):
    """
    Modelo de base de datos que representa la tabla 'carros'.
    
    Atributos:
        id (int): Identificador único del carro. Clave primaria.
        modelo (int): Año del modelo del carro.
        marca (str): Marca del carro.
        serie (str): Serie o referencia del carro.
    """
    __tablename__ = "carros"

    id = Column(Integer, primary_key=True, index=True)
    modelo = Column(Integer, nullable=False)
    marca = Column(String(255), nullable=False)
    serie = Column(String(255), nullable=False)
