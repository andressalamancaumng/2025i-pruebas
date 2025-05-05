from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas, crud
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/carros/", response_model=schemas.Carro)
def crear_carro(carro: schemas.CarroCreate, db: Session = Depends(get_db)):
    return crud.create_carro(db, carro=carro)

@app.get("/carros/", response_model=list[schemas.Carro])
def leer_carros(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_carros(db, skip=skip, limit=limit)

@app.get("/carros/{carro_id}", response_model=schemas.Carro)
def leer_carro(carro_id: int, db: Session = Depends(get_db)):
    db_carro = crud.get_carro(db, carro_id=carro_id)
    if not db_carro:
        raise HTTPException(status_code=404, detail="Carro no encontrado")
    return db_carro

@app.delete("/carros/{carro_id}")
def eliminar_carro(carro_id: int, db: Session = Depends(get_db)):
    db_carro = crud.delete_carro(db, carro_id=carro_id)
    if not db_carro:
        raise HTTPException(status_code=404, detail="Carro no encontrado")
    return {"message": "Carro eliminado"}