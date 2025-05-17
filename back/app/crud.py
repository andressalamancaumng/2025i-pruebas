# Se importa el módulo random para generar IDs aleatorios
import random
# Se importa la clase Session de SQLAlchemy para interactuar con la base de datos
from sqlalchemy.orm import Session
# Se importa el modelo Pelicula desde el módulo local .models
from .models import Pelicula
# Se importan funciones para ordenamiento ascendente y descendente
from sqlalchemy import asc, desc

# ======================================
# Funciones CRUD para el modelo Pelicula
# ======================================

# Función para crear una nueva película en la base de datos
def create_pelicula(db: Session, nombrepelicula: str, director: str, anio: int):
    # Se crea una instancia de Pelicula con los datos proporcionados
    db_pelicula = Pelicula(nombrepelicula=nombrepelicula, director=director, anio=anio)
    
    # Se verifica si ya existe una película con el mismo nombre y director
    existing_pelicula = db.query(Pelicula).filter(
        Pelicula.nombrepelicula == nombrepelicula,
        Pelicula.director == director
    ).first()
    
    # Si ya existe, se retorna None y no se crea duplicado
    if existing_pelicula:
        return None

    # Si no existe, se genera un ID aleatorio para la película
    random_id = random.randint(1, 1000000)
    # Se crea una nueva instancia con el ID aleatorio
    db_pelicula = Pelicula(id=random_id, nombrepelicula=nombrepelicula, director=director, anio=anio)

    # Se agrega y guarda la película en la base de datos
    db.add(db_pelicula)
    db.commit()
    db.refresh(db_pelicula)  # Actualiza la instancia con los datos del DB
    return db_pelicula

# Función para obtener todas las películas ordenadas por ID
def get_peliculas(db: Session):
    return db.query(Pelicula).order_by(Pelicula.id).all()

# Función para obtener una película específica por su ID
def get_pelicula(db: Session, pelicula_id: int):
    return db.query(Pelicula).filter(Pelicula.id == pelicula_id).first()

# Función para eliminar una película usando filtros detallados
def delete_pelicula_by_details(db: Session, pelicula_id: int = None, nombrepelicula: str = None, director: str = None):
    # Se comienza con una consulta base del modelo Pelicula
    query = db.query(Pelicula)

    # Se aplican filtros si se proporcionan
    if pelicula_id is not None:
        query = query.filter(Pelicula.id == pelicula_id)
    if nombrepelicula is not None:
        query = query.filter(Pelicula.nombrepelicula == nombrepelicula)
    if director is not None:
        query = query.filter(Pelicula.director == director)

    # Se obtiene la primera coincidencia
    pelicula = query.first()

    # Si se encontró una película, se elimina y se guarda el cambio
    if pelicula:
        db.delete(pelicula)
        db.commit()
        return pelicula

    # Si no se encontró ninguna coincidencia, se retorna None
    return None

# Función para eliminar una película directamente por su ID
def delete_pelicula(db: Session, pelicula_id: int):
    # Se busca la película con el ID dado
    pelicula = db.query(Pelicula).filter(Pelicula.id == pelicula_id).first()
    
    # Si se encuentra, se elimina y se confirma en la base de datos
    if pelicula:
        db.delete(pelicula)
        db.commit()
        return pelicula

    # Si no existe, se retorna None
    return None
