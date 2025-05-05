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


#holaa
