from fastapi import FastAPI, Depends
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
def create_pelicula(nombre: str, año: int, director: str, db: Session = Depends(get_db)):
    return crud.create_pelicula(db, nombre, año, director)

@app.get("/peliculas/")
def read_peliculas(db: Session = Depends(get_db)):
    return crud.get_peliculas(db)

@app.get("/peliculas/{pelicula_id}")
def read_pelicula(pelicula_id: int, db: Session = Depends(get_db)):
    pelicula = crud.get_pelicula(db, pelicula_id)
    if pelicula is None:
        raise HTTPException(status_code=404, detail="Película no encontrada")
    return pelicula

@app.delete("/peliculas/{pelicula_id}")
def delete_pelicula(pelicula_id: int, db: Session = Depends(get_db)):
    pelicula = crud.delete_pelicula(db, pelicula_id)
    if pelicula is None:
        raise HTTPException(status_code=404, detail="Película no encontrada")
    return pelicula

