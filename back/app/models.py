from sqlalchemy import Column, Integer, String
from .database import Base

class Pelicula(Base):
   
    __tablename__ = "peliculas"

    id = Column(Integer, primary_key=True, index=True)
    nombrepelicula = Column(Integer, nullable=False)
    director = Column(String(255), nullable=False)
    anio = Column(Integer, nullable=False)
