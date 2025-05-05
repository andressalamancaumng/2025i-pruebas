from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app import models, crud, database
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()  # Crea la instancia de la aplicación FastAPI

models.Base.metadata.create_all(bind=database.engine)  # Crea las tablas en la base de datos si no existen

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Puedes restringir a ["http://localhost:8100"] si prefieres
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    # Proporciona una sesión de la base de datos
    db = database.SessionLocal()
    try:
        yield db  # Devuelve la sesión
    finally:
        db.close()  # Cierra la sesión al finalizar

@app.post("/users/")
def create_user(name: str, email: str, document: str, db: Session = Depends(get_db)):
    # Crea un nuevo usuario
    return crud.create_user(db, name, email, document)

@app.get("/users/")
def read_users(db: Session = Depends(get_db)):
    # Obtiene todos los usuarios
    return crud.get_users(db)

@app.get("/user/")
def read_user(id: int = None, name: str = None, email: str = None, document: str = None, db: Session = Depends(get_db)):
    # Busca un usuario por ID, nombre, email o documento
    if id is not None:
        return crud.get_user_by_id(db, id)
    if name is not None:
        return crud.get_user_by_name(db, name)
    if email is not None:
        return crud.get_user_by_email(db, email)
    if document is not None:
        return crud.get_user_by_document(db, document)
    return {"error": "Debes proporcionar un parámetro de búsqueda"}  # Error si no se proporciona parámetro

@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    # Elimina un usuario por su ID
    return crud.delete_user(db, user_id)