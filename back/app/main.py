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
   
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/peliculas/", response_model=schemas.Pelicula)
def crear_pelicula(pelicula: schemas.PeliculaCreate, db: Session = Depends(get_db)):
    
    db_pelicula = crud.create_pelicula(db, pelicula=pelicula)
    if db_pelicula is None:
        raise HTTPException(status_code=400, detail="La pelicula con ese nombre y director ya existe")
    return db_pelicula

@app.get("/peliculas/", response_model=list[schemas.Pelicula])
def leer_pelicula(skip: int = 0, limit: int = 100, order_by: str = Query("id", description="Campo para ordenar: id, NombrePelicula, Director"), db: Session = Depends(get_db)):
   
    return crud.get_peliculas(db, skip=skip, limit=limit, order_by=order_by)

@app.get("/peliculas/{pelicula_id}", response_model=schemas.Pelicula)
def leer_pelicula(pelicula_id: int, db: Session = Depends(get_db)):
   
    db_pelicula = crud.get_pelicula(db, pelicula_id=pelicula_id)
    if not db_pelicula:
        raise HTTPException(status_code=404, detail="Pelicula no encontrado")
    return db_pelicula

@app.delete("/pelicula/")
def eliminar_pelicula_por_detalles(
    pelicula_id: int = Query(..., description="ID de la pelicula"),
    nombrepelicula: int = Query(...),
    director: str = Query(..., description="Director sin comillas"),
    db: Session = Depends(get_db)
):
    
    # Limpiar comillas si las hubiera en la marca
    director_limpia = director.strip('"').strip("'")
    db_pelicula = crud.delete_pelicula_by_details(db, pelicula_id=pelicula_id, nombrepelicula=nombrepelicula, director=director_limpia)
    if not db_pelicula:
        raise HTTPException(status_code=404, detail="Pelicula no encontrada")
    return {"message": "Pelicula eliminada por id"}
