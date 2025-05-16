from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, crud, database

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

models.Base.metadata.create_all(bind=database.engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Puedes restringir a ["http://localhost:8100"] si prefieres
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/peliculas/")
def create_pelicula(nombre: str, anio: int, director: str, db: Session = Depends(get_db)):
    return crud.create_pelicula(db, nombre, anio, director)

@app.get("/peliculas/")
def read_peliculas(db: Session = Depends(get_db)):
    return crud.get_peliculas(db)

@app.get("/peliculas/{id}")
def read_pelicula(id: int, db: Session = Depends(get_db)):
    pelicula = crud.get_pelicula_by_id(db, id)
    if not pelicula:
        raise HTTPException(status_code=404, detail="Pelicula no encontrada")
    return pelicula

@app.get("/peliculas/buscar/")
def buscar_pelicula(nombre: str = None, id: int = None, db: Session = Depends(get_db)):
    
    if id is not None:
        pelicula = crud.get_pelicula_by_id(db, id)
        if not pelicula:
            raise HTTPException(status_code=404, detail="Pelicula no encontrada")
        return pelicula
    
    # Si se pasa nombre, busca por nombre
    if nombre:
        peliculas = crud.get_pelicula_by_nombre(db, nombre)
        if not peliculas:
            raise HTTPException(status_code=404, detail="Pelicula no encontrada")
        return peliculas
    
    raise HTTPException(status_code=400, detail="Debes proveer 'nombre' o 'id' para buscar")
