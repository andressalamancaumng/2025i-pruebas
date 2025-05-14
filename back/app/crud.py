from sqlalchemy.orm import Session
from app.models import User

def create_user(db: Session, name: str, email: str, documento:str):
    db_user = User(name=name, email=email,documento=documento)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users(db: Session):
    return db.query(User).all()

def get_userID(db:Session,userID:int):
    return db.query(User).filter(User.ID==userID).first()

def get_name(db:Session,name:int):
    return db.query(User).filter(User.name==name).first()

def get_email(db:Session,email:int):
    return db.query(User).filter(User.email==email).first()

def get_documento(db:Session,documento:int):
    return db.query(User).filter(User.documento==documento).first()

def delete_user(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        db.delete(user)
        db.commit()
        return user
    return None
