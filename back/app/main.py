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

@app.get("/users/{userid}")
def read_user_by_id(user_id: int, db: Session = Depends(get_db)):
    return crud.get_user_by_id(db, userid)

@app.get("/users/name/{name}")
def read_user_by_name(name: str, db: Session = Depends(get_db)):
    return crud.get_user_by_name(db, name)

@app.get("/users/email/{email}")
def read_user_by_email(email: str, db: Session = Depends(get_db)):
    return crud.get_user_by_email(db, email)

@app.get("/users/documento/{documento}")
def read_user_by_documento(documento: str, db: Session = Depends(get_db)):
    return crud.get_user_by_documento(db, documento)

@app.delete("/users/{user_d}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = crud.delete_user(db, userid)
    if user:
        return {"message": f"Usuario con ID {user_id} eliminado."}
    else:
        return {"error": "Usuario no encontrado."}
