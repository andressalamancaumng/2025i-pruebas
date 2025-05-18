from sqlalchemy.orm import Session
from app.models import Pelicula

# Función para crear una nueva película en la base de datos
def crear_pelicula(db: Session, titulo: str, year: int, director: str):
    db_pelicula = Pelicula(titulo=titulo, year=year, director=director)  # Crea una instancia del modelo
    db.add(db_pelicula)      # Agrega la película a la sesión de base de datos
    db.commit()              # Guarda los cambios en la base de datos
    db.refresh(db_pelicula)  # Actualiza el objeto con los datos guardados (como el id asignado)
    return db_pelicula       # Retorna la película creada

# Función para obtener todas las películas de la base de datos
def obtener_peliculas(db: Session):
    return db.query(Pelicula).all()  # Realiza una consulta para traer todas las películas

# Función para obtener una película específica por su ID
def obtener_pelicula(db: Session, pelicula_id: int):
    return db.query(Pelicula).filter(Pelicula.id == pelicula_id).first()  # Devuelve la primera coincidencia o None

# Función para eliminar una película de la base de datos por su ID
def eliminar_pelicula(db: Session, pelicula_id: int):
    db_pelicula = db.query(Pelicula).filter(Pelicula.id == pelicula_id).first()  # Busca la película por ID
    if db_pelicula:
        db.delete(db_pelicula)  # Elimina la película si existe
        db.commit()             # Guarda los cambios
        return True             # Indica que se eliminó correctamente
    return False                # Indica que no se encontró la película
