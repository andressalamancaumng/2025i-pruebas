from sqlalchemy.orm import Session
from app.models import User
from app.models import Carro 

def create_user(db: Session, name: str, email: str):
    db_user = User(name=name, email=email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users(db: Session):
    return db.query(User).all()

# CRUD para Carro
def create_carro(db: Session, modelo: int, marca: str, serie: str):
    db_carro = Carro(modelo=modelo, marca=marca, serie=serie)
    db.add(db_carro)
    db.commit()
    db.refresh(db_carro)
    return db_carro

def get_carros(db: Session):
    return db.query(Carro).all()

def get_carro_by_id(db: Session, carro_id: int):
    return db.query(Carro).filter(Carro.id == carro_id).first()

def delete_carro(db: Session, carro_id: int):
    carro = db.query(Carro).filter(Carro.id == carro_id).first()
    if carro:
        db.delete(carro)
        db.commit()
    return carro