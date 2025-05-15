import random
from sqlalchemy.orm import Session
from .models import Pelicula
from .schemas import PeliculaCreate
from sqlalchemy import asc, desc

# ============================
# CRUD functions for Pelicula
# ============================

def create_pelicula(db: Session, pelicula: PeliculaCreate):
   
    # Verifica si ya existe un carro con el mismo modelo y marca
    existing_pelicula = db.query(Pelicula).filter(
        Pelicula.nombrepelicula == pelicula.nombrepelicula,
        Pelicula.director == pelicula.director
    ).first()
    if existing_pelicula:
        return None  # Ya existe, no se crea uno nuevo

    # Genera un ID aleatorio para la nueva pelicula
    random_id = random.randint(1, 1000000)
    db_pelicula = Pelicula(id=random_id, nombrepelicula=pelicula.nombrepelicula, director=pelicula.director, anio=pelicula.año)
    
    # Guarda el nuevo carro en la base de datos
    db.add(db_pelicula)
    db.commit()
    db.refresh(db_pelicula)
    return db_pelicula

def get_peliculas(db: Session, skip: int = 0, limit: int = 100, order_by: str = "id"):
    
    # Verifica si el campo de ordenamiento existe en el modelo
    order_column = getattr(Pelicula, order_by, None)
    if order_column is None:
        order_column = Pelicula.id  # Valor por defecto

    query = db.query(Pelicula).order_by(asc(order_column)).offset(skip).limit(limit)
    return query.all()

def get_pelicula(db: Session, pelicula_id: int):
  
    return db.query(Pelicula).filter(Pelicula.id == pelicula_id).first()

def delete_carro_by_details(db: Session, pelicula_id: int = None, nombrepelicula: int = None, director: str = None):
    
    query = db.query(Pelicula)
    
    # Filtra por los parámetros provistos
    if pelicula_id is not None:
        query = query.filter(Pelicula.id == pelicula_id)
    if nombrepelicula is not None:
        query = query.filter(Pelicula.nombrepelicula == nombrepelicula)
    if director is not None:
        query = query.filter(Pelicula.director == director)

    pelicula = query.first()

    if pelicula:
        db.delete(pelicula)
        db.commit()
        return pelicula

    return None

def delete_pelicula(db: Session, pelicula_id: int):
   
    pelicula = db.query(Pelicula).filter(Pelicula.id == pelicula_id).first()
    if pelicula:
        db.delete(pelicula)
        db.commit()
        return pelicula
    return None
