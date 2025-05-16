from fastapi import FastAPI, Depends, HTTPException, Query , Request
from sqlalchemy.orm import Session
from . import models, crud
from .database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

models.Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency para obtener DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Middleware para CORS


@app.post("/peliculas/")
async def crear_pelicula(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    nombrepelicula = data.get("nombrepelicula")
    director = data.get("director")
    anio = data.get("anio")

    if not all([nombrepelicula, director, anio]):
        raise HTTPException(status_code=400, detail="Faltan datos obligatorios")

    db_pelicula = crud.create_pelicula(db, nombrepelicula, director, anio)
    if db_pelicula is None:
        raise HTTPException(status_code=400, detail="La película ya existe")

    return {"detail": "Película creada", "pelicula": {
        "id": db_pelicula.id,
        "nombrepelicula": db_pelicula.nombrepelicula,
        "director": db_pelicula.director,
        "anio": db_pelicula.anio
    }}



@app.get("/peliculas/")
def leer_peliculas(db: Session = Depends(get_db)):
    return crud.get_peliculas(db)

@app.get("/peliculas/{pelicula_id}")
def leer_pelicula(pelicula_id: int, db: Session = Depends(get_db)):
    db_pelicula = crud.get_pelicula(db, pelicula_id=pelicula_id)
    if not db_pelicula:
        raise HTTPException(status_code=404, detail="Película no encontrada")
    return db_pelicula

@app.delete("/peliculas/")
def eliminar_pelicula_por_detalles(
    pelicula_id: int = Query(..., description="ID de la película"),
    nombrepelicula: str = Query(...),
    director: str = Query(..., description="Director sin comillas"),
    db: Session = Depends(get_db)
):
    director_limpia = director.strip('"').strip("'")
    db_pelicula = crud.delete_pelicula_by_details(db, pelicula_id=pelicula_id, nombrepelicula=nombrepelicula, director=director_limpia)
    if not db_pelicula:
        raise HTTPException(status_code=404, detail="Película no encontrada")
    return {"message": "Película eliminada"}