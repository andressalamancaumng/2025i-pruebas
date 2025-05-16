from sqlalchemy.orm import Session
from app.models import Movie

def create_movie(db: Session, name: str, year: int, director: str):
    db_movie = Movie(name=name, year=year, director=director)
    db.add(db_movie)
    db.commit()
    db.refresh(db_movie)
    return db_movie

def get_movies(db: Session):
    return db.query(Movie).all()

def get_movie(db: Session, name: str):
    return db.query(Movie).filter(Movie.name == name).first()

def get_movie_by_details(db: Session, name: str, year: int, director: str):
    return db.query(Movie).filter(
        Movie.name == name,
        Movie.year == year,
        Movie.director == director
    ).first()

def delete_movie(db: Session, movie_id: int):
    db_movie = db.query(Movie).filter(Movie.id == movie_id).first()
    if db_movie:
        db.delete(db_movie)
        db.commit()
        return True
    return False
