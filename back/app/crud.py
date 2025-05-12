from sqlalchemy.orm import Session
from app.models import Carro

def crear_carro(db: Session, modelo: int, marca: str, serie: str):
    nuevo_carro = Carro(modelo=modelo, marca=marca, serie=serie)
    db.add(nuevo_carro)
    db.commit()
    db.refresh(nuevo_carro)
    return nuevo_carro

def obtener_carros(db: Session):
    return db.query(Carro).all()

def obtener_carro_por_id(db: Session, carro_id: int):
    return db.query(Carro).filter(Carro.id == carro_id).first()

def eliminar_carro(db: Session, carro_id: int):
    carro = db.query(Carro).filter(Carro.id == carro_id).first()
    if carro:
        db.delete(carro)
        db.commit()
    return carro

