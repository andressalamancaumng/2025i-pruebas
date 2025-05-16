from sqlalchemy.orm import Session
from app.models import User, Peliculas
 

def create_user(db: Session, name: str, email: str):
    db_user = User(name=name, email=email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users(db: Session):
    return db.query(User).all()

def get_peliculas(db: Session):
    return db.query(Peliculas).all()

def get_peliculas_by_id(db: Session, peliculas_id: int):
    return db.query(Peliculas).filter(Peliculas.id == peliculas_id).first()

def delete_peliculas(db: Session, peliculas_id: int):
    pelicula = db.query(Peliculas).filter(Peliculas.id == peliculas_id).first()
    if pelicula:
        db.delete(pelicula)
        db.commit()
        return True
    return False