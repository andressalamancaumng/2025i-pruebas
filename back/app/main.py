from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from . import models, schemas, crud
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

from .initial_data import seed_initial_data

@app.on_event("startup")
def startup_event():
    db = next(get_db())
    seed_initial_data(db)

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
def leer_carros(skip: int = 0, limit: int = 100, order_by: str = Query("id", description="Campo para ordenar: id, modelo, marca"), db: Session = Depends(get_db)):
    return crud.get_carros(db, skip=skip, limit=limit, order_by=order_by)

@app.get("/carros/{carro_id}", response_model=schemas.Carro)
def leer_carro(carro_id: int, db: Session = Depends(get_db)):
    db_carro = crud.get_carro(db, carro_id=carro_id)
    if not db_carro:
        raise HTTPException(status_code=404, detail="Carro no encontrado")
    return db_carro

@app.delete("/carros/")
def eliminar_carro_por_detalles(
    carro_id: int = Query(..., description="ID del carro"),
    modelo: int = Query(...),
    marca: str = Query(..., description="Marca sin comillas"),
    db: Session = Depends(get_db)
):
    # Limpiar comillas si las hubiera en marca
    marca_limpia = marca.strip('"').strip("'")
    db_carro = crud.delete_carro_by_details(db, carro_id=carro_id, modelo=modelo, marca=marca_limpia)
    if not db_carro:
        raise HTTPException(status_code=404, detail="Carro no encontrado con esos detalles")
    return {"message": "Carro eliminado por detalles"}

from fastapi import Query

@app.delete("/carros/all")
def eliminar_todos_los_carros(confirm: str = Query(None, description="Confirma la eliminación con 'yes'"), db: Session = Depends(get_db)):
    if confirm != "yes":
        return {"message": "Por favor confirma la eliminación enviando el parámetro confirm='yes'"}
    deleted_count = crud.delete_all_carros(db)
    return {"message": f"Se eliminaron {deleted_count} carros"}

