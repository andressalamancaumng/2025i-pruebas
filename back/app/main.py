from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from app import crud, models, database

# Crear las tablas en la base de datos
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# CORS para permitir acceso desde Angular/Ionic
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8100"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependencia para obtener la sesión de la base de datos
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Schemas
class UserBase(BaseModel):
    nombre: str
    correo: str
    documento: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    class Config:
        orm_mode = True

# Ruta raíz para verificar que el backend está corriendo
@app.get("/")
def root():
    return {"message": "API de usuarios funcionando correctamente"}

# Crear usuario
@app.post("/usuarios/", response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    if crud.obtener_usuario_por_correo(db, user.correo):
        raise HTTPException(status_code=400, detail="Correo ya registrado")
    if crud.obtener_usuario_por_documento(db, user.documento):
        raise HTTPException(status_code=400, detail="Documento ya registrado")
    return crud.crear_usuario(db, user.nombre, user.correo, user.documento)

# Obtener todos los usuarios
@app.get("/usuarios/", response_model=List[User])
def get_users(db: Session = Depends(get_db)):
    return crud.obtener_usuarios(db)

# Obtener usuario por ID
@app.get("/usuarios/id/{user_id}", response_model=User)
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    user = crud.obtener_usuario_por_id(db, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user

# Buscar usuario por nombre, correo o documento
@app.get("/usuarios/buscar/", response_model=List[User])
def buscar_usuario(query: str, db: Session = Depends(get_db)):
    results = crud.buscar_usuarios(db, query)
    if not results:
        raise HTTPException(status_code=404, detail="No se encontraron coincidencias")
    return results

# Eliminar usuario por cualquier campo
@app.delete("/usuarios/eliminar/")
def eliminar_usuario(query: str, db: Session = Depends(get_db)):
    user = (
        crud.obtener_usuario_por_correo(db, query)
        or crud.obtener_usuario_por_documento(db, query)
        or crud.obtener_usuario_por_nombre(db, query)
        or (crud.obtener_usuario_por_id(db, int(query)) if query.isdigit() else None)
    )
    if user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    crud.eliminar_usuario(db, user.id)
    return {"message": f"Usuario eliminado con éxito (id: {user.id})"}
