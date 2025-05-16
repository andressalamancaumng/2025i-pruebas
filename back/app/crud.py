from sqlalchemy.orm import Session
from app.models import User, Pelicula
 

def create_user(db: Session, name: str, email: str):
    db_user = User(name=name, email=email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users(db: Session):
    return db.query(User).all()

def get_peliculas(db: Session):
    return db.query(Pelicula).all()

def get_pelicula_by_id(db: Session, pelicula_id: int):
    return db.query(Pelicula).filter(Pelicula.id == pelicula_id).first()

def delete_pelicula(db: Session, pelicula_id: int):
    pelicula = db.query(Pelicula).filter(Pelicula.id == pelicula_id).first()
    if pelicula:
        db.delete(pelicula)
        db.commit()
        return True
    return False