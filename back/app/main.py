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

## Rutas para la API
# 
# Post para crear una pelicula      
@app.post("/peliculas/")
def crear_pelicula(titulo: str, year: int, director: str, db: Session = Depends(get_db)):
    pelicula = crud.crear_pelicula(db , titulo , year , director)
    return {"detail": "Pelicula creada", "pelicula": pelicula}

# Get para obtener todas las peliculas
@app.get("/peliculas/")
def obtener_peliculas(db: Session = Depends(get_db)):
    return crud.obtener_peliculas(db)

# Get para obtener una pelicula por id
@app.get("/peliculas/{pelicula_id}")
def obtener_pelicula(pelicula_id: int, db: Session = Depends(get_db)):
    pelicula = crud.obtener_pelicula(db, pelicula_id)
    if pelicula is None:
        return {"detail": "Pelicula no encontrada"}
    return pelicula

# Delete para eliminar una pelicula por id
@app.delete("/peliculas/{pelicula_id}")
def eliminar_pelicula(pelicula_id: int, db: Session = Depends(get_db)):
    if not crud.eliminar_pelicula(db, pelicula_id) :
        return {"detail": "Pelicula no encontrada"}
    return {"detail": "Pelicula eliminada"}
