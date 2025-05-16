from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Pelicula(Base):
    __tablename__ = "peliculas"  

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), index=True)
    anio = Column(Integer, index=True)
    director = Column(String(100), index=True) 