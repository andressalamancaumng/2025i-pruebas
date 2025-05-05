from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app import models, crud, database
from typing import Optional

app = FastAPI()

models.Base.metadata.create_all(bind=database.engine)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/")
def create_user(name: str, email: str, documento: str, db: Session = Depends(get_db)):
    return crud.create_user(db, name, email, documento)

@app.get("/users/")
def read_users(
    name: Optional[str] = None,
    email: Optional[str] = None,
    documento: Optional[str] = None,
    db: Session = Depends(get_db)
):
    return crud.get_users(db, name, email, documento)

@app.delete("/users/")
def delete_user(documento: str, db: Session = Depends(get_db)):
    return crud.delete_user_by_documento(db, documento)