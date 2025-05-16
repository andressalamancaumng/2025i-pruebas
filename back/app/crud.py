from sqlalchemy.orm import Session
from app.models import Pelicula

def create_pelicula(db: Session, nombre: str, anio: int, director: str):
    pelicula = Pelicula(nombre=nombre, anio=anio, director=director)
    db.add(pelicula)
    db.commit()
    db.refresh(pelicula)
    return pelicula

def get_peliculas(db: Session):
    return db.query(Pelicula).all()

def get_pelicula_by_id(db: Session, id: int):
    return db.query(Pelicula).filter(Pelicula.id == id).first()

def get_pelicula_by_nombre(db: Session, nombre: str):
    return db.query(Pelicula).filter(Pelicula.nombre.ilike(f"%{nombre}%")).all()

