import random
from sqlalchemy.orm import Session
from .models import Carro
from .schemas import CarroCreate
from sqlalchemy import asc, desc

# ============================
# CRUD functions for Carro
# ============================

def create_carro(db: Session, carro: CarroCreate):
    """
    Crea un nuevo registro de carro en la base de datos, siempre y cuando no exista uno
    con el mismo modelo y marca.

    Args:
        db (Session): Sesión de la base de datos.
        carro (CarroCreate): Objeto con los datos del carro a crear.

    Returns:
        Carro | None: El objeto Carro creado, o None si ya existía uno igual.
    """
    # Verifica si ya existe un carro con el mismo modelo y marca
    existing_carro = db.query(Carro).filter(
        Carro.modelo == carro.modelo,
        Carro.marca == carro.marca
    ).first()
    if existing_carro:
        return None  # Ya existe, no se crea uno nuevo

    # Genera un ID aleatorio para el nuevo carro
    random_id = random.randint(1, 1000000)
    db_carro = Carro(id=random_id, modelo=carro.modelo, marca=carro.marca, serie=carro.serie)
    
    # Guarda el nuevo carro en la base de datos
    db.add(db_carro)
    db.commit()
    db.refresh(db_carro)
    return db_carro

def get_carros(db: Session, skip: int = 0, limit: int = 100, order_by: str = "id"):
    """
    Obtiene una lista de carros desde la base de datos, con paginación y ordenamiento.

    Args:
        db (Session): Sesión de la base de datos.
        skip (int): Cantidad de registros a omitir (paginación).
        limit (int): Número máximo de registros a devolver.
        order_by (str): Campo por el cual ordenar los resultados.

    Returns:
        List[Carro]: Lista de objetos Carro.
    """
    # Verifica si el campo de ordenamiento existe en el modelo
    order_column = getattr(Carro, order_by, None)
    if order_column is None:
        order_column = Carro.id  # Valor por defecto

    query = db.query(Carro).order_by(asc(order_column)).offset(skip).limit(limit)
    return query.all()

def get_carro(db: Session, carro_id: int):
    """
    Obtiene un carro específico por su ID.

    Args:
        db (Session): Sesión de la base de datos.
        carro_id (int): ID del carro a buscar.

    Returns:
        Carro | None: El objeto Carro si se encuentra, o None si no.
    """
    return db.query(Carro).filter(Carro.id == carro_id).first()

def delete_carro_by_details(db: Session, carro_id: int = None, modelo: int = None, marca: str = None):
    """
    Elimina un carro que coincida con los detalles proporcionados.

    Args:
        db (Session): Sesión de la base de datos.
        carro_id (int, optional): ID del carro a eliminar.
        modelo (int, optional): Modelo del carro a eliminar.
        marca (str, optional): Marca del carro a eliminar.

    Returns:
        Carro | None: El objeto Carro eliminado, o None si no se encontró.
    """
    query = db.query(Carro)
    
    # Filtra por los parámetros provistos
    if carro_id is not None:
        query = query.filter(Carro.id == carro_id)
    if modelo is not None:
        query = query.filter(Carro.modelo == modelo)
    if marca is not None:
        query = query.filter(Carro.marca == marca)

    carro = query.first()

    if carro:
        db.delete(carro)
        db.commit()
        return carro

    return None

def delete_carro(db: Session, carro_id: int):
    """
    Elimina un carro por su ID.

    Args:
        db (Session): Sesión de la base de datos.
        carro_id (int): ID del carro a eliminar.

    Returns:
        Carro | None: El objeto Carro eliminado, o None si no se encontró.
    """
    carro = db.query(Carro).filter(Carro.id == carro_id).first()
    if carro:
        db.delete(carro)
        db.commit()
        return carro
    return None
