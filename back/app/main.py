from fastapi import FastAPI, Depends
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

@app.post("/users/")
def create_user(name: str, email: str,documento, db: Session = Depends(get_db)):
    return crud.create_user(db, name, email,documento)

@app.get("/users/")
def read_users(db: Session = Depends(get_db)):
    return crud.get_users(db)

@app.get("/users/search")
def search_user(
    user_id: int = None,
    name: str = None,
    email: str = None,
    documento: str = None,
    db: Session = Depends(get_db)):
    if user_id is not None:
        return crud.get_user_by_id(db, user_id)
    if name is not None:
        return crud.get_user_by_name(db, name)
    if email is not None:
        return crud.get_user_by_email(db, email)
    if documento is not None:
        return crud.get_user_by_documento(db, documento)
