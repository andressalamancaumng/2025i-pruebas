from sqlalchemy.orm import Session
from app.models import User

def create_user(db: Session, name: str, email: str, documento: int):
    db_user = User(name=name, email=email, documento=documento)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user_by_id(db:Session, user_id:int):
    user=db.query(User).filter(User.id==user_id).first()
    if user:
        db.delete(user)
        db.commit()
        return True
    return False
    
def get_user(db: Session):
    return db.query(User).all()

def get_user_by_id(db:Session, users_id:int):
    return db.query(User).filter(User.id == users_id).first()

def get_user_by_name(db:Session, name:str):
    return db.query(User).filter(User.name == name).first()    

def get_user_by_email(db:Session, email:str):
    return db.query(User).filter(User.email == email).first()

def get_user_by_documento(db:Session, documento:int):
    return db.query(User).filter(User.documento==documento).first()

