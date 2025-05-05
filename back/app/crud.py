from sqlalchemy.orm import Session
from app.models import User

# Crea un nuevo usuario en la base de datos con los datos proporcionados (nombre, email, documento).
def create_user(db: Session, name: str, email: str, document: str):
    db_user = User(name=name, email=email, document=document)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Obtiene todos los usuarios almacenados en la base de datos.
def get_users(db: Session):
    return db.query(User).all()

# Obtiene un usuario específico por su ID.
def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

# Obtiene un usuario específico por su nombre.
def get_user_by_name(db: Session, name: str):
    return db.query(User).filter(User.name == name).first()

# Obtiene un usuario específico por su correo electrónico.
def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

# Obtiene un usuario específico por su documento.
def get_user_by_document(db: Session, document: str):
    return db.query(User).filter(User.document == document).first()

# Elimina un usuario de la base de datos por su ID, si existe.
def delete_user(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        db.delete(user)
        db.commit()
    return user