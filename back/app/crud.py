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

def movie_id_or_name(db: Session, movie_id: int, name: str):
    if movie_id:
        return db.query(Movies).filter(Movies.id==int(movie_id)).first()
    elif name:
        return db.query(Movies).filter(Movies.name==name).all()
    else:
        raise ValueError("No tiene id la película o proporcione un nombre")
    
def delete_movie(db:Session,movie_id: int):
    movie_select=db.query(Movies).filter(Movies.id==movie_id).first()
    if movie_select is not None:
        db.delete(movie_select)
        db.commit()
    else: 
        raise ValueError("No se encuentra película con ese id")