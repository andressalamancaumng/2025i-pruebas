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

from fastapi import Query

@app.delete("/carros/")
def eliminar_carro_por_detalles(
    carro_id: int = Query(...),
    modelo: int = Query(...),
    marca: str = Query(...),
    db: Session = Depends(get_db)
):
    db_carro = crud.delete_carro_by_details(db, carro_id=carro_id, modelo=modelo, marca=marca)
    if not db_carro:
        raise HTTPException(status_code=404, detail="Carro no encontrado con esos detalles")
    return {"message": "Carro eliminado por detalles"}

@app.post("/users/", response_model=schemas.User)
def crear_usuario(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db, user=user)

@app.get("/users/", response_model=list[schemas.User])
def leer_usuarios(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_users(db, skip=skip, limit=limit)

@app.get("/users/{user_id}", response_model=schemas.User)
def leer_usuario(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return db_user

@app.delete("/users/{user_id}")
def eliminar_usuario(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.delete_user(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return {"message": "Usuario eliminado"}
