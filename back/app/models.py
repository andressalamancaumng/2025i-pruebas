from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from app.database import Base  # Importamos la base declarativa desde el archivo database.py

# Definimos el modelo User que representa la tabla "users" en la base de datos
class User(Base):
    __tablename__ = "users"  # Nombre de la tabla en la base de datos

    # Definimos las columnas de la tabla con sus respectivos tipos y restricciones
    id = Column(Integer, primary_key=True, index=True)  # Columna 'id', clave primaria, indexada
    name = Column(String(50), index=True)  # Columna 'name', tipo String con un máximo de 50 caracteres, indexada
    email = Column(String(50), unique=True, index=True)  # Columna 'email', tipo String, única y indexada
    document = Column(String(20), unique=True, index=True)  # Columna 'document', tipo String, única y indexada
