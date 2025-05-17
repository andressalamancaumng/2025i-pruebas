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

@app.delete("/peliculas/{id}")
def delete_pelicula(id: int, db: Session = Depends(get_db)):
    try:
        crud.delete_pelicula(db, id)
        return {"message": f"Película con ID {id} eliminada y IDs ajustados."}
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
