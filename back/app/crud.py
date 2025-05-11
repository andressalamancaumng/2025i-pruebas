from sqlalchemy.orm import Session
from .models import Carro, User
from .schemas import CarroCreate, UserCreate
from sqlalchemy import asc, desc

# CRUD functions for Carro

def create_carro(db: Session, carro: CarroCreate):
    db_carro = Carro(modelo=carro.modelo, marca=carro.marca, serie=carro.serie)
    db.add(db_carro)
    db.commit()
    db.refresh(db_carro)
    return db_carro

def get_carros(db: Session, skip: int = 0, limit: int = 100, order_by: str = "id"):
    order_column = getattr(Carro, order_by, None)
    if order_column is None:
        order_column = Carro.id
    query = db.query(Carro).order_by(asc(order_column)).offset(skip).limit(limit)
    return query.all()

def get_carro(db: Session, carro_id: int):
    return db.query(Carro).filter(Carro.id == carro_id).first()

def delete_carro_by_details(db: Session, carro_id: int = None, modelo: int = None, marca: str = None):
    query = db.query(Carro)
    if carro_id is not None:
        query = query.filter(Carro.id == carro_id)
    if modelo is not None:
        query = query.filter(Carro.modelo == modelo)
    if marca is not None:
        query = query.filter(Carro.marca == marca)
    carro = query.first()
    if carro:
        db.delete(carro)
        db.commit()
        return carro
    return None

def delete_carro(db: Session, carro_id: int):
    carro = db.query(Carro).filter(Carro.id == carro_id).first()
    if carro:
        db.delete(carro)
        db.commit()
        return carro
    return None

# CRUD functions for User

def create_user(db: Session, user: UserCreate):
    db_user = User(name=user.name, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def delete_user(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        db.delete(user)
        db.commit()
        return user
    return None
