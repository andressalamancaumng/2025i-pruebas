from sqlalchemy.orm import Session
from app.models import User
from app.models import Carros
from app.schemas import CarroCreate

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

def create_carro_manual(db: Session, modelo: int, marca: str, serie: str):
    db_carro = Carros(modelo=modelo, marca=marca, serie=serie)
    db.add(db_carro)
    db.commit()
    db.refresh(db_carro)
    return db_carro

def delete_carro(db: Session, carro_id: int):
    carro = db.query(Carros).filter(Carros.id == carro_id).first()
    if carro:
        db.delete(carro)
        db.commit()
    return carro
