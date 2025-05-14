from sqlalchemy.orm import Session
from app.models import User

def create_user(db: Session, name: str, email: str, document:str):
    db_user = User(name=name, email=email,document=document)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_and_delete_user_by_id(db: Session, id: int):
    user = db.query(User).filter(User.id == id).first()
    if user:
        db.delete(user)
        db.commit()
    return user


def find_user_by_any_field(db: Session, id=None, name=None, email=None, document=None):
    query = db.query(User)
    
    if id is not None:
        query = query.filter(User.id == id)
    if name is not None:
        query = query.filter(User.name == name)
    if email is not None:
        query = query.filter(User.email == email)
    if document is not None:
        query = query.filter(User.document == document)
    
    return query.first()