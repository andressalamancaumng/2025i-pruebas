from sqlalchemy.orm import Session
from app.models import User

# Crear un nuevo usuario
def crear_usuario(db: Session, nombre: str, correo: str, documento: str):
    db_user = User(nombre=nombre, correo=correo, documento=documento)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Obtener todos los usuarios
def obtener_usuarios(db: Session):
    return db.query(User).all()

# Obtener un usuario por ID
def obtener_usuario_por_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

# Obtener un usuario por nombre
def obtener_usuario_por_nombre(db: Session, nombre: str):
    return db.query(User).filter(User.nombre == nombre).first()

# Obtener un usuario por correo
def obtener_usuario_por_correo(db: Session, correo: str):
    return db.query(User).filter(User.correo == correo).first()

# Obtener un usuario por documento
def obtener_usuario_por_documento(db: Session, documento: str):
    return db.query(User).filter(User.documento == documento).first()

# Eliminar un usuario por ID
def eliminar_usuario(db: Session, user_id: int):
    usuario = db.query(User).filter(User.id == user_id).first()
    if usuario:
        db.delete(usuario)
        db.commit()
    return usuario

# Búsqueda de usuarios por nombre, correo o documento
def buscar_usuarios(db: Session, query: str):
    return db.query(User).filter(
        User.nombre.ilike(f"%{query}%") |  # Filtrar por nombre
        User.correo.ilike(f"%{query}%") |  # Filtrar por correo
        User.documento.ilike(f"%{query}%")  # Filtrar por documento
    ).all()