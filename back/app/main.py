from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, crud, database, schemas

app = FastAPI()

models.Base.metadata.create_all(bind=database.engine)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/")
def create_user(name: str, email: str, db: Session = Depends(get_db)):
    return crud.create_user(db, name, email)

@app.get("/users/")
def read_users(db: Session = Depends(get_db)):
    return crud.get_users(db)

@app.post("/carros/", response_model=schemas.Carro)
def crear_carro(carro: schemas.CarroCreate, db: Session = Depends(get_db)):
    return crud.create_carro(db, carro)

@app.get("/carros/", response_model=list[schemas.Carro])
def leer_carros(db: Session = Depends(get_db)):
    return crud.get_carros(db)

@app.get("/carros/{carro_id}", response_model=schemas.Carro)
def leer_carro(carro_id: int, db: Session = Depends(get_db)):
    carro = crud.get_carro_by_id(db, carro_id)
    if not carro:
        raise HTTPException(status_code=404, detail="Carro no encontrado")
    return carro

@app.delete("/carros/{carro_id}", response_model=schemas.Carro)
def eliminar_carro(carro_id: int, db: Session = Depends(get_db)):
    carro = crud.delete_carro(db, carro_id)
    if not carro:
        raise HTTPException(status_code=404, detail="Carro no encontrado")
    return carro