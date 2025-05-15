from sqlalchemy.orm import Session
from app.models import Movies

def create_movie(db: Session, name: str, year: int, name_director:str):
    db_movies = Movies(name=name, year=year, name_director=name_director)
    db.add(db_movies)
    db.commit()
    db.refresh(db_movies)
    return db_movies

def get_movies(db: Session):
    return db.query(Movies).all()

#def movie_id_or_name(db: Session, id: int, name: str):
    