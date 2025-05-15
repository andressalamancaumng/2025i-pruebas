from sqlalchemy.orm import Session
from app.models import Usuario

def crear_usuario(db: Session, nombre: str, correo: str, documento: str):
    nuevo_usuario = Usuario(nombre=nombre, correo=correo, documento=documento)
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario

def eliminar_usuario_por_id(db: Session, usuario_id: int):
    usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    if usuario:
        db.delete(usuario)
        db.commit()
        return True
    return False

def buscar_usuario(db: Session, valor: str):
    return db.query(Usuario).filter(
        (Usuario.id == valor) |
        (Usuario.nombre == valor) |
        (Usuario.correo == valor) |
        (Usuario.documento == valor)
    ).first()

