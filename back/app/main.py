from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app import models, crud, database

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


from app import models, database  # Ajusta si tu estructura es distinta

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

@app.get("/")
def read_root():
    return {"mensaje": "API funcionando correctamente"}