from sqlalchemy.orm import Session
from app.models import Movie

# Funcion para crear una película
def create_movie(db: Session, title: str, year: int, director: str):
    db_movie = Movie(title=title, year=year, director=director)
    db.add(db_movie)
    db.commit()
    db.refresh(db_movie)
    return db_movie

# Funcion para obtener todas las películas
def get_movies(db: Session):
    return db.query(Movie).all()

# Funcion para obtener una película por su ID
def get_movie(db: Session, title: str):
    return db.query(Movie).filter(Movie.title == title).first()

# Funcion para obtener una película por su título, año y director
def get_movie_by_details(db: Session, title: str, year: int, director: str):
    return db.query(Movie).filter(
        Movie.title == title,
        Movie.year == year,
        Movie.director == director
    ).first()

# Funcion para eliminar una película por su ID
def delete_movie(db: Session, movie_id: int):
    db_movie = db.query(Movie).filter(Movie.id == movie_id).first()
    if db_movie:
        db.delete(db_movie)
        db.commit()
        return True
    return False
