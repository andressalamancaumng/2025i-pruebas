from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

# Crea una clase base a partir de la cual se definirán los modelos de la base de datos
Base = declarative_base()

# Define el modelo de la tabla 'peliculas'
class Pelicula(Base):
    __tablename__ = "peliculas"  # Nombre de la tabla en la bdd

    id = Column(Integer, primary_key=True, index=True)        # ID único de la película (clave primaria)
    titulo = Column(String(50), index=True)                   # Título de la película (hasta 50 caracteres)
    year = Column(Integer, index=True)                        # Año de lanzamiento de la película
    director = Column(String(50), index=True)                 # Nombre del director de la película
