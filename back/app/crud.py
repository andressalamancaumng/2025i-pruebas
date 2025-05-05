from sqlalchemy.orm import Session
from app.models import User
from app import models

def create_user(db: Session, name: str, email: str, documento: str):
    db_user = User(name=name, email=email, documento=documento)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users(db, name: str = None, email: str = None, documento: str = None):
    query = db.query(models.User)
    
    if name:
        query = query.filter(models.User.name == name)
    if email:
        query = query.filter(models.User.email == email)
    if documento:
        query = query.filter(models.User.documento == documento)
    
    return query.all()

def delete_user_by_documento(db, documento: str):
    user = db.query(models.User).filter(models.User.documento == documento).first()
    if user:
        db.delete(user)
        db.commit()
        return {"message": "Usuario eliminado exitosamente"}
    else:
        return {"error": "Usuario no encontrado"}