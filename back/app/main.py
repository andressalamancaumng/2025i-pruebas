from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, crud, database
from .schemas import CarroCreate
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

models.Base.metadata.create_all(bind=database.engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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

# ------------------- ENDPOINTS -------------------

# Crear carro con datos en JSON (no query params)
@app.post("/carros/")
def crear_carro(carro: CarroCreate, db: Session = Depends(get_db)):
    return crud.crear_carro(db, carro.modelo, carro.marca, carro.serie)

@app.get("/carros/")
def obtener_todos_los_carros(db: Session = Depends(get_db)):
    return crud.obtener_todos_los_carros(db)

@app.get("/carros/{id_carro}")
def obtener_carro_por_id(id_carro: int, db: Session = Depends(get_db)):
    carro = crud.obtener_carro_por_id(db, id_carro)
    if not carro:
        raise HTTPException(status_code=404, detail="Carro no encontrado")
    return carro

@app.delete("/carros/{id_carro}")
def eliminar_carro(id_carro: int, db: Session = Depends(get_db)):
    carro = crud.eliminar_carro(db, id_carro)
    if not carro:
        raise HTTPException(status_code=404, detail="Carro no encontrado")
    return {"mensaje": "Carro eliminado exitosamente"}
