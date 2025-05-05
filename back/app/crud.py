from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException
from sqlalchemy import or_
from .models import User


def create_user(db: Session, name: str, email: str, document: str):
    db_user = User(name=name, email=email, document=document)
    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Email already registered")


def get_users(db: Session):
    return db.query(User).all()


def delete_user(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        db.delete(user)
        db.commit()
        return {"message": "User deleted"}
    return {"error": "User not found"}


def get_user_by_fields(db: Session, id: int = None, name: str = None, email: str = None, document: str = None):
    filters = []
    if id is not None:
        filters.append(User.id == id)
    if name is not None:
        filters.append(User.name == name)
    if email is not None:
        filters.append(User.email == email)
    if document is not None:
        filters.append(User.document == document)

    if not filters:
        return []  # o podrías devolver todos los usuarios, dependiendo del caso

    return db.query(User).filter(or_(*filters)).all()
