import random
from sqlalchemy.orm import Session
from .models import Pelicula
from sqlalchemy import asc, desc

# ============================
# CRUD functions for Pelicula
# ============================

def create_pelicula(db: Session, nombrepelicula: str, director: str, anio: int):
    db_pelicula = Pelicula(nombrepelicula=nombrepelicula, director=director, anio=anio)
    existing_pelicula = db.query(Pelicula).filter(
        Pelicula.nombrepelicula == nombrepelicula,
        Pelicula.director == director
    ).first()
    if existing_pelicula:
        return None

    random_id = random.randint(1, 1000000)
    db_pelicula = Pelicula(id=random_id, nombrepelicula=nombrepelicula, director=director, anio=anio)

    db.add(db_pelicula)
    db.commit()
    db.refresh(db_pelicula)
    return db_pelicula

def get_peliculas(db: Session):
    return db.query(Pelicula).order_by(Pelicula.id).all()

def get_pelicula(db: Session, pelicula_id: int):
    return db.query(Pelicula).filter(Pelicula.id == pelicula_id).first()

def delete_pelicula_by_details(db: Session, pelicula_id: int = None, nombrepelicula: str = None, director: str = None):
    query = db.query(Pelicula)

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