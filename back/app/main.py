from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, crud, database  # Asegúrate que estos módulos existan
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Query
from pydantic import BaseModel

app = FastAPI()


class CarroCreate(BaseModel):
    marca: str
    modelo: int
    serie: str
    
# Corrige el guión: bind-database -> bind=database
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
        yield db  # Sangría corregida
    finally:
        db.close()  # Sangría corregida

# Corrige los paréntesis en las rutas: (carro_id) -> {carro_id}
@app.post("/carros/")
def create_carro(carro: CarroCreate, db: Session = Depends(get_db)):
    return crud.create_carro(
        db, 
        marca=carro.marca, 
        modelo=carro.modelo, 
        serie=carro.serie,

    )

@app.get("/carros/")
def get_carros(db: Session = Depends(get_db)):
    return crud.get_carros(db)

@app.get("/carros/{carro_id}")  # Corregido
def get_carro_por_id(carro_id: int, db: Session = Depends(get_db)):
    return crud.get_carro_by_id(db, carro_id)

@app.delete("/carros/{carro_id}")  # Corregido
def delete_carro(carro_id: int, db: Session = Depends(get_db)):
    return crud.delete_carro(db, carro_id)