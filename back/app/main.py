from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app import models, crud, database
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

models.Base.metadata.create_all(bind=database.engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Puedes restringir a ["http://localhost:3306"] si prefieres
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
def create_user(name: str, email: str, db: Session = Depends(get_db)):
    return crud.create_user(db, name, email)

@app.get("/users/")
def read_users(db: Session = Depends(get_db)):
    return crud.get_users(db)

@app.delete("/usuarios/{user_id}")
def borrar_usuario(user_id: int, db: Session = Depends(database.get_db)):
    resultado = crud.eliminar_usuario(db, user_id)
    if not resultado:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return {"mensaje": "Usuario eliminado correctamente"}

@app.get("/usuarios/buscar")
def buscar_usuario(
    id: int = Query(None),
    nombre: str = Query(None),
    correo: str = Query(None),
    documento: str = Query(None),
    db: Session = Depends(database.get_db)
):
    usuarios = crud.buscar_usuario(db, id, nombre, correo, documento)
    if not usuarios:
        raise HTTPException(status_code=404, detail="No se encontraron usuarios")
    return usuarios