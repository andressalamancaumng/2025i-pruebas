from sqlalchemy.orm import Session
from app.models import User, Carro

# ------------------- FUNCIONES DE USUARIO -------------------
def create_user(db: Session, name: str, email: str):
    db_user = User(name=name, email=email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users(db: Session):
    return db.query(User).all()

# ------------------- FUNCIONES DE CARRO ---------------------
def crear_carro(db: Session, modelo: str, marca: str, serie: str):
    nuevo_carro = Carro(modelo=modelo, marca=marca, serie=serie)
    db.add(nuevo_carro)
    db.commit()
    db.refresh(nuevo_carro)
    return nuevo_carro

def obtener_todos_los_carros(db: Session):
    return db.query(Carro).all()

def obtener_carro_por_id(db: Session, id_carro: int):
    return db.query(Carro).filter(Carro.id == id_carro).first()

def eliminar_carro(db: Session, id_carro: int):
    carro = db.query(Carro).filter(Carro.id == id_carro).first()
    if carro:
        db.delete(carro)
        db.commit()
    return carro
