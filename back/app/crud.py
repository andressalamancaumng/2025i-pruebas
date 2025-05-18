from sqlalchemy.orm import Session
from app.models import Carros

def create_carro(db: Session, marca: str, modelo: int, serie:str):
    db_carro = Carros(marca=marca, modelo=modelo, serie=serie)
    db.add(db_carro)
    db.commit()
    db.refresh(db_carro)
    return db_carro

def get_carros(db: Session):
    return db.query(Carros).all()
def get_carro_by_id(db: Session, carro_id: int):
    return db.query(Carros).filter(Carros.id == carro_id).first()

def delete_carro(db: Session, carro_id: int):
    db_carro = db.query(Carros).filter(Carros.id == carro_id).first()
    if db_carro is not None:
        db.delete(db_carro)
        db.commit()