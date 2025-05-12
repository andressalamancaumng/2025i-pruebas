from fastapi import FastAPI, Depends, HTTPException
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

# Dependencia para obtener sesión de base de datos
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/carros/")
def crear_carro(modelo: int, marca: str, serie: str, db: Session = Depends(get_db)):
    return crud.crear_carro(db, modelo, marca, serie)

@app.get("/carros/")
def get_todos_los_carros(db: Session = Depends(get_db)):
    return crud.obtener_carros(db)

@app.get("/carros/{carro_id}")
def get_carro_por_id(carro_id: int, db: Session = Depends(get_db)):
    carro = crud.obtener_carro_por_id(db, carro_id)
    if carro is None:
        raise HTTPException(status_code=404, detail="Carro no encontrado")
    return carro

@app.delete("/carros/{carro_id}")
def eliminar_carro(carro_id: int, db: Session = Depends(get_db)):
    carro = crud.eliminar_carro(db, carro_id)
    if carro is None:
        raise HTTPException(status_code=404, detail="Carro no encontrado")
    return {"mensaje": "Carro eliminado"}
