from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, crud, database
from pydantic import BaseModel
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

class CarroCreate(BaseModel):
    modelo: int
    marca: str
    serie: str

@app.post("/users/")
def create_user(name: str, email: str, db: Session = Depends(get_db)):
    return crud.create_user(db, name, email)

@app.get("/users/")
def read_users(db: Session = Depends(get_db)):
    return crud.get_users(db)

# **Rutas para carros (Carro)**

@app.post("/carros/")
def create_carro(carro: CarroCreate, db: Session = Depends(get_db)):
    return crud.create_carro(db, carro.modelo, carro.marca, carro.serie)

# @app.post("/carros/")
#def create_carro(modelo: int, marca: str, serie: str, db: Session = Depends(get_db)):
#    return crud.create_carro(db, modelo, marca, serie)

@app.get("/carros/")
def read_carros(db: Session = Depends(get_db)):
    return crud.get_carros(db)

@app.get("/carros/{carro_id}")
def read_carro(carro_id: int, db: Session = Depends(get_db)):
    db_carro = crud.get_carro_by_id(db, carro_id)
    if db_carro is None:
        raise HTTPException(status_code=404, detail="Carro not found")
    return db_carro

@app.delete("/carros/{carro_id}")
def delete_carro(carro_id: int, db: Session = Depends(get_db)):
    db_carro = crud.delete_carro(db, carro_id)
    if db_carro is None:
        raise HTTPException(status_code=404, detail="Carro not found")
    return {"message": "Carro deleted successfully"}
