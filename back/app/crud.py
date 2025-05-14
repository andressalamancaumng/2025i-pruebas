from sqlalchemy.orm import Session
from app.models import Movie

def create_movie(db: Session, name: str, year: int, director: str):
    db_movie = Movie(name=name, year=year, director=director)
    db.add(db_movie)
    db.commit()
    db.refresh(db_movie)
    return db_movie

def get_all_movies(db: Session):
    return db.query(Movie).all()

def get_movie_by_id_or_name(db: Session, value: str):
    if value.isdigit():
        return db.query(Movie).filter(Movie.id == int(value)).first()
    else:
        return db.query(Movie).filter(Movie.name == value).first()

def delete_movie(db: Session, movie_id: int):
    movie = db.query(Movie).filter(Movie.id == movie_id).first()
    if movie:
        db.delete(movie)
        db.commit()
    return movie
