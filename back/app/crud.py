from sqlalchemy.orm import Session
from app.models import User, models

def create_user(db: Session, name: str, email: str):
    db_user = User(name=name, email=email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users(db: Session):
    return db.query(User).all()

def eliminar_usuario(db: Session, user_id: int):
    usuario = db.query(models.User).filter(models.User.id == user_id).first()
    if usuario:
        db.delete(usuario)
        db.commit()
        return True
    return False

def buscar_usuario(db: Session, id=None, nombre=None, correo=None, documento=None):
    query = db.query(models.User)
    if id:
        query = query.filter(models.User.id == id)
    if nombre:
        query = query.filter(models.User.nombre == nombre)
    if correo:
        query = query.filter(models.User.correo == correo)
    if documento:
        query = query.filter(models.User.documento == documento)
    return query.all()
