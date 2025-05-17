from sqlalchemy.orm import Session
from app.models import Pelicula

# Crud para crear una pelicula
def crear_pelicula(db: Session, titulo: str, year: int, director: str):
    db_pelicula = Pelicula(titulo = titulo, year=year, director=director)
    db.add(db_pelicula)
    db.commit()
    db.refresh(db_pelicula)
    return db_pelicula

# Crud para obtener todas las peliculas
def obtener_peliculas(db: Session):
    return db.query(Pelicula).all()

# Crud para obtener una pelicula por id
def obtener_pelicula(db: Session, pelicula_id: int):
    return db.query(Pelicula).filter(Pelicula.id == pelicula_id).first()


# Crud para eliminar una pelicula por id
def eliminar_pelicula(db: Session, pelicula_id: int):
    db_pelicula = db.query(Pelicula).filter(Pelicula.id == pelicula_id).first()
    if db_pelicula:
        db.delete(db_pelicula)
        db.commit()
        return True
    return False