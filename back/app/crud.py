from sqlalchemy.orm import Session
from . import models, schemas

def create_carro(db: Session, carro: schemas.CarroCreate):
    db_carro = models.Carro(modelo=carro.modelo, marca=carro.marca, serie=carro.serie)
    db.add(db_carro)
    db.commit()
    db.refresh(db_carro)
    return db_carro

def get_carros(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Carro).offset(skip).limit(limit).all()

def get_carro(db: Session, carro_id: int):
    return db.query(models.Carro).filter(models.Carro.id == carro_id).first()

def delete_carro(db: Session, carro_id: int):
    db_carro = db.query(models.Carro).filter(models.Carro.id == carro_id).first()
    if db_carro:
        db.delete(db_carro)
        db.commit()
        return db_carro
    return None

def delete_carro_by_details(db: Session, carro_id: int, modelo: int, marca: str):
    db_carro = db.query(models.Carro).filter(
        models.Carro.id == carro_id,
        models.Carro.modelo == modelo,
        models.Carro.marca == marca
    ).first()
    if db_carro:
        db.delete(db_carro)
        db.commit()
        return db_carro
    return None
