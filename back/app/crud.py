from sqlalchemy.orm import Session
from sqlalchemy import text
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


def delete_pelicula(db: Session, id: int):
    pelicula = db.query(Pelicula).filter(Pelicula.id == id).first()
    if pelicula:
        db.delete(pelicula)
        db.commit()
    
        db.execute(text("SET @count = 0;"))
        db.execute(text("UPDATE peliculas SET id = (@count := @count + 1);"))
        db.execute(text("ALTER TABLE peliculas AUTO_INCREMENT = 1;"))
        db.commit()
    else:
        raise Exception("Película no encontrada")

