from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from . import models, schemas, crud
from .database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware

# Crea las tablas definidas en los modelos si no existen
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

from .initial_data import seed_initial_data

@app.on_event("startup")
def startup_event():
    """
    Evento de arranque de la aplicación.
    Se ejecuta al iniciar el servidor y carga los datos iniciales en la base de datos.
    """
    db = next(get_db())
    seed_initial_data(db)

# Middleware para permitir solicitudes desde cualquier origen (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Puedes restringir a ["http://localhost:8100"] si prefieres
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    """
    Proporciona una sesión de base de datos para ser utilizada en los endpoints.

    Yields:
        Session: Sesión activa de SQLAlchemy.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/carros/", response_model=schemas.Carro)
def crear_carro(carro: schemas.CarroCreate, db: Session = Depends(get_db)):
    """
    Crea un nuevo carro si no existe otro con el mismo modelo y marca.

    Args:
        carro (CarroCreate): Datos del carro a crear.
        db (Session): Sesión de base de datos.

    Returns:
        Carro: El objeto carro creado.

    Raises:
        HTTPException: Si ya existe un carro con el mismo modelo y marca.
    """
    db_carro = crud.create_carro(db, carro=carro)
    if db_carro is None:
        raise HTTPException(status_code=400, detail="El carro con ese modelo y marca ya existe")
    return db_carro

@app.get("/carros/", response_model=list[schemas.Carro])
def leer_carros(skip: int = 0, limit: int = 100, order_by: str = Query("id", description="Campo para ordenar: id, modelo, marca"), db: Session = Depends(get_db)):
    """
    Obtiene una lista de carros registrados, con paginación y ordenamiento opcional.

    Args:
        skip (int): Número de registros a omitir (para paginación).
        limit (int): Número máximo de registros a devolver.
        order_by (str): Campo por el cual ordenar los resultados.
        db (Session): Sesión de base de datos.

    Returns:
        list[Carro]: Lista de carros registrados.
    """
    return crud.get_carros(db, skip=skip, limit=limit, order_by=order_by)

@app.get("/carros/{carro_id}", response_model=schemas.Carro)
def leer_carro(carro_id: int, db: Session = Depends(get_db)):
    """
    Obtiene un carro específico por su ID.

    Args:
        carro_id (int): ID del carro.
        db (Session): Sesión de base de datos.

    Returns:
        Carro: Objeto carro encontrado.

    Raises:
        HTTPException: Si no se encuentra el carro.
    """
    db_carro = crud.get_carro(db, carro_id=carro_id)
    if not db_carro:
        raise HTTPException(status_code=404, detail="Carro no encontrado")
    return db_carro

@app.delete("/carros/")
def eliminar_carro_por_detalles(
    carro_id: int = Query(..., description="ID del carro"),
    modelo: int = Query(...),
    marca: str = Query(..., description="Marca sin comillas"),
    db: Session = Depends(get_db)
):
    """
    Elimina un carro usando una combinación de ID, modelo y marca.

    Args:
        carro_id (int): ID del carro.
        modelo (int): Año del modelo.
        marca (str): Marca del carro (sin comillas).
        db (Session): Sesión de base de datos.

    Returns:
        dict: Mensaje de éxito si se elimina.

    Raises:
        HTTPException: Si no se encuentra un carro con esos detalles.
    """
    # Limpiar comillas si las hubiera en la marca
    marca_limpia = marca.strip('"').strip("'")
    db_carro = crud.delete_carro_by_details(db, carro_id=carro_id, modelo=modelo, marca=marca_limpia)
    if not db_carro:
        raise HTTPException(status_code=404, detail="Carro no encontrado con esos detalles")
    return {"message": "Carro eliminado por detalles"}
