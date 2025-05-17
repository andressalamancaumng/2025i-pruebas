# Importación de módulos de FastAPI y SQLAlchemy necesarios para la API
from fastapi import FastAPI, Depends, HTTPException, Query , Request
from sqlalchemy.orm import Session

# Importación de módulos locales para modelos y operaciones CRUD
from . import models, crud
from .database import SessionLocal, engine

# Importación de middleware para permitir CORS
from fastapi.middleware.cors import CORSMiddleware

# Creación de la aplicación FastAPI
app = FastAPI()

# Creación de todas las tablas en la base de datos si no existen
models.Base.metadata.create_all(bind=engine)

# Agregar middleware CORS para permitir solicitudes desde cualquier origen
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # Permite todos los orígenes
    allow_credentials=True,       # Permite el uso de cookies/autenticación
    allow_methods=["*"],          # Permite todos los métodos HTTP
    allow_headers=["*"],          # Permite todos los encabezados
)

# Dependency para obtener una sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db                 # Se retorna la sesión
    finally:
        db.close()              # Se cierra la sesión al terminar

# ==============================
# Endpoint para crear una película
# ==============================
@app.post("/peliculas/")
async def crear_pelicula(request: Request, db: Session = Depends(get_db)):
    # Se obtiene el JSON enviado en el cuerpo de la solicitud
    data = await request.json()
    nombrepelicula = data.get("nombrepelicula")
    director = data.get("director")
    anio = data.get("anio")

    # Validación: verificar si todos los campos requeridos están presentes
    if not all([nombrepelicula, director, anio]):
        raise HTTPException(status_code=400, detail="Faltan datos obligatorios")

    # Llama a la función CRUD para crear la película
    db_pelicula = crud.create_pelicula(db, nombrepelicula, director, anio)
    if db_pelicula is None:
        raise HTTPException(status_code=400, detail="La película ya existe")

    # Respuesta con detalles de la película creada
    return {"detail": "Película creada", "pelicula": {
        "id": db_pelicula.id,
        "nombrepelicula": db_pelicula.nombrepelicula,
        "director": db_pelicula.director,
        "anio": db_pelicula.anio
    }}

# =================================
# Endpoint para obtener todas las películas
# =================================
@app.get("/peliculas/")
def leer_peliculas(db: Session = Depends(get_db)):
    return crud.get_peliculas(db)

# =================================
# Endpoint para obtener una película por su ID
# =================================
@app.get("/peliculas/{pelicula_id}")
def leer_pelicula(pelicula_id: int, db: Session = Depends(get_db)):
    db_pelicula = crud.get_pelicula(db, pelicula_id=pelicula_id)
    if not db_pelicula:
        raise HTTPException(status_code=404, detail="Película no encontrada")
    return db_pelicula

# ===============================================
# Endpoint para eliminar una película por detalles específicos
# ===============================================
@app.delete("/peliculas/")
def eliminar_pelicula_por_detalles(
    pelicula_id: int = Query(..., description="ID de la película"),
    nombrepelicula: str = Query(...),
    director: str = Query(..., description="Director sin comillas"),
    db: Session = Depends(get_db)
):
    # Se limpia el nombre del director por si contiene comillas
    director_limpia = director.strip('"').strip("'")

    # Llamada a función CRUD para eliminar por detalles
    db_pelicula = crud.delete_pelicula_by_details(
        db,
        pelicula_id=pelicula_id,
        nombrepelicula=nombrepelicula,
        director=director_limpia
    )

    if not db_pelicula:
        raise HTTPException(status_code=404, detail="Película no encontrada")
    
    return {"message": "Película eliminada"}
