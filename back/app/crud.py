from sqlalchemy.orm import Session
from app.models import Pelicula

def create_pelicula(db: Session, nombre: str, anio: int, director: str):
    db_pelicula = Pelicula(nombre=nombre, anio=anio, director=director)

    db.add(db_pelicula)
    db.commit()
    db.refresh(db_pelicula)
    return db_pelicula

def get_peliculas(db: Session):
    return db.query(Pelicula).all()

def get_peliculas_id(db: Session, pelicula_id: int):
    return db.query(Pelicula).filter(Pelicula.id == pelicula_id).first()

def borrar_pelicula(db: Session, pelicula_id: int):
    pelicula = db.query(Pelicula).filter(Pelicula.id == pelicula_id).first()
    if pelicula:
        db.delete(pelicula)
        db.commit()
    return pelicula

