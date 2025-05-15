from sqlalchemy.orm import Session
from app.models import User
from app.models import Movie

def create_user(db: Session, name: str, email: str):
    db_user = User(name=name, email=email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users(db: Session):
    return db.query(User).all()

def create_movie(db: Session, name_movie: str, year: int, director: str):
    db_user = Movie(name_movie=name_movie, year=year, director=director)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_movie(db: Session):
    return db.query(Movie).all()

def get_movie_by_id(id: int, db: Session):
    return db.query(Movie).filter(Movie.id == id).first()

def delete_movie_by_id(id: int, db: Session):
    delete = db.query(Movie).filter(Movie.id == id).first()
    if delete: 
        db.delete(delete)
        db.commit()
    return
