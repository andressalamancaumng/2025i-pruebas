# Se importan los tipos de columnas desde SQLAlchemy
from sqlalchemy import Column, Integer, String
# Se importa la clase base declarativa para los modelos desde el archivo database
from .database import Base

# Se define la clase Pelicula que representa la tabla "peliculas" en la base de datos
class Pelicula(Base):
   
    # Nombre de la tabla en la base de datos
    __tablename__ = "peliculas"

    # Definición de columnas:
    
    # Columna 'id' como clave primaria, de tipo entero, con índice
    id = Column(Integer, primary_key=True, index=True)

    # Columna 'nombrepelicula' de tipo string, obligatoria (no puede ser null)
    nombrepelicula = Column(String(255), nullable=False)

    # Columna 'director' de tipo string, obligatoria
    director = Column(String(255), nullable=False)

    # Columna 'anio' de tipo entero, obligatoria
    anio = Column(Integer, nullable=False)
