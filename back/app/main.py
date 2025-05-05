from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
import re

from app import models, crud, database

app = FastAPI()

# Crea las tablas si no existen
models.Base.metadata.create_all(bind=database.engine)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependencia para conexión a base de datos
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint para crear usuario
@app.post("/users/")
def create_user(name: str, email: str, documento: str, db: Session = Depends(get_db)):
    if not re.fullmatch(r'\d{1,10}', documento):
        raise HTTPException(status_code=400, detail="Documento inválido: solo números (máx. 10 dígitos)")
    return crud.create_user(db, name, email, documento)

# Obtener todos los usuarios
@app.get("/users/")
def read_users(db: Session = Depends(get_db)):
    return crud.get_users(db)

# Obtener un usuario por ID
@app.get("/users/{user_id}")
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = crud.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user

# Eliminar usuario por ID
@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = crud.delete_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado para eliminar")
    return {"mensaje": f"Usuario con ID {user_id} eliminado exitosamente"}
