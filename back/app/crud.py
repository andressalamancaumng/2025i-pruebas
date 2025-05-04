from sqlalchemy.orm import Session
from app.models import User
from models import Carros
from schemas import CarroCreate

def create_user(db: Session, name: str, email: str):
    db_user = User(name=name, email=email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users(db: Session):
    return db.query(User).all()

def get_carros(db: Session):
    return db.query(Carros).all()

def get_carro_by_id(db: Session, carro_id: int):
    return db.query(Carros).filter(Carros.id == carro_id).first()

def create_carro(db: Session, carro: CarroCreate):
    nuevo_carro = Carros(**carro.dict())
    db.add(nuevo_carro)
    db.commit()
    db.refresh(nuevo_carro)
    return nuevo_carro

def delete_carro(db: Session, carro_id: int):
    carro = db.query(Carros).filter(Carros.id == carro_id).first()
    if carro:
        db.delete(carro)
        db.commit()
    return carro
