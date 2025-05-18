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

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/cars/")
def create_car(modelo: str, marca: str, serie: str, db: Session = Depends(get_db)):
    return crud.create_car(db,modelo,marca,serie)

@app.get("/cars/")
def Search_cars(db: Session = Depends(get_db)):



    return crud.get_cars(db)

@app.get("/cars/{car_id}")
def Search_carID(car_id: int, db: Session=Depends(get_db)):
    car = crud.get_car_ID(db, car_id)
    if car is None:
        raise HTTPException(status_code=404, detail="Carro NO encontrado")
    return car

@app.delete("/cars/")
def delete_cars(car_id: int, modelo: str, marca:str, db: Session=Depends(get_db)):
    succes=crud.delete_car(db,car_id,modelo,marca)
    if not succes:
        raise HTTPException(status_code=404, detail="Carro no encontrado con los datos proporcionados")
    return {"message": "Carro eliminado con exito"}