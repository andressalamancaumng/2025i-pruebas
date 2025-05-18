# Importación de FastAPI y dependencias para manejo de base de datos
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app import models, crud, database
from fastapi.middleware.cors import CORSMiddleware

# Instancia principal de la aplicación FastAPI
app = FastAPI()

# Crea las tablas definidas en los modelos si no existen en la base de datos
models.Base.metadata.create_all(bind=database.engine)

# Configura el middleware CORS para permitir solicitudes desde cualquier origen
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Puedes restringir a ["http://localhost:8100"] si prefieres
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependencia para obtener una sesión de la base de datos y cerrarla al finalizar
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

## Rutas para la API

# Ruta POST para crear una película. Recibe título, año y director como parámetros.
@app.post("/peliculas/")
def crear_pelicula(titulo: str, year: int, director: str, db: Session = Depends(get_db)):
    pelicula = crud.crear_pelicula(db , titulo , year , director)
    return {"detail": "Pelicula creada", "pelicula": pelicula}

# Ruta GET para obtener todas las películas almacenadas en la base de datos
@app.get("/peliculas/")
def obtener_peliculas(db: Session = Depends(get_db)):
    return crud.obtener_peliculas(db)

# Ruta GET para obtener una película específica por su ID
@app.get("/peliculas/{pelicula_id}")
def obtener_pelicula(pelicula_id: int, db: Session = Depends(get_db)):
    pelicula = crud.obtener_pelicula(db, pelicula_id)
    if pelicula is None:
        return {"detail": "Pelicula no encontrada"}
    return pelicula

# Ruta DELETE para eliminar una película específica por su ID
@app.delete("/peliculas/{pelicula_id}")
def eliminar_pelicula(pelicula_id: int, db: Session = Depends(get_db)):
    if not crud.eliminar_pelicula(db, pelicula_id):
        return {"detail": "Pelicula no encontrada"}
    return {"detail": "Pelicula eliminada"}
