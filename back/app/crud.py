from sqlalchemy.orm import Session
from app.models import User

def crear_usuario(db: Session, nombre: str, correo: str,documento:str):
    db_user= User(nombre=nombre, correo=correo, documento=documento)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def obtener_usuarios(db: Session):
    return db.query(User).all()

def obtener_usuario_por_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def obtener_usuario_por_nombre(db: Session, nombre: str):
    return db.query(User).filter(User.nombre == nombre).first()

def obtener_usuario_por_correo(db: Session, correo: str):
    return db.query(User).filter(User.correo == correo).first()

def obtener_usuario_por_documento(db: Session, documento: str):
    return db.query(User).filter(User.documento == documento).first()

def eliminar_usuario(db: Session, user_id: int):
    usuario = db.query(User).filter(User.id == user_id).first()
    if usuario:
        db.delete(usuario)
        db.commit()
    return usuario