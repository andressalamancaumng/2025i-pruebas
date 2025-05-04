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
def create_user(name: str, email: str, documento: int, db: Session = Depends(get_db)):
    return crud.create_user(db, name, email, documento)

@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    success = crud.delete_user_by_id(db, user_id)
    if success:
        return {"message": "Usuario eliminado correctamente"}
    return {"error": "Usuario no encontrado"}

@app.get("/users/")
def read_users(db: Session = Depends(get_db)):
    return crud.get_user(db)
    
@app.get("/users/{user_id}")
def read_user_by_id(user_id:int, db:Session=Depends(get_db)):
    return crud.get_user_by_id(db,user_id)

@app.get("/users/name/{name}")
def read_user_by_name(name:str, db:Session=Depends(get_db)):
    return crud.get_user_by_name(db,name)

@app.get("/users/email/{email}")
def read_user_by_email(email:str, db:Session=Depends(get_db)):
    return crud.get_user_by_email(db,email)
    
@app.get("/users/documento/{documento}")
def read_user_by_documento(documento:int, db:Session=Depends(get_db)):
    return crud.get_user_by_documento(db,documento)

