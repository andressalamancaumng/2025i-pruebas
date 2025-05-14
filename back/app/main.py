from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# Habilitar CORS para permitir conexiones desde localhost (ajusta puertos si usas otros)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8100", "http://localhost:4200", "http://localhost"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo para crear usuario (sin id, porque lo generaremos automáticamente)
class UserCreate(BaseModel):
    nombre: str
    correo: str
    documento: str

# Modelo para respuesta (incluye id)
class User(UserCreate):
    id: int

# Base de datos simulada
users_db: List[User] = []
next_id = 1  # Contador para asignar IDs automáticos

# Obtener todos los usuarios
@app.get("/usuarios/", response_model=List[User])
def get_users():
    return users_db

# Crear usuario (genera id automáticamente)
@app.post("/usuarios/", response_model=User)
def create_user(user: UserCreate):
    global next_id
    # Validar que correo o documento no estén repetidos
    for u in users_db:
        if u.correo == user.correo:
            raise HTTPException(status_code=400, detail="Correo ya registrado")
        if u.documento == user.documento:
            raise HTTPException(status_code=400, detail="Documento ya registrado")

    new_user = User(id=next_id, **user.dict())
    users_db.append(new_user)
    next_id += 1
    return new_user

# Eliminar usuario por ID
@app.delete("/usuarios/{id}")
def delete_user(id: int):
    for i, user in enumerate(users_db):
        if user.id == id:
            users_db.pop(i)
            return {"message": "Usuario eliminado"}
    raise HTTPException(status_code=404, detail="Usuario no encontrado")

# Obtener usuario por ID
@app.get("/usuarios/id/{id}", response_model=User)
def get_user_by_id(id: int):
    for user in users_db:
        if user.id == id:
            return user
    raise HTTPException(status_code=404, detail="Usuario no encontrado")

# Buscar por nombre (puede devolver varios usuarios)
@app.get("/usuarios/nombre/{nombre}", response_model=List[User])
def search_by_nombre(nombre: str):
    results = [user for user in users_db if nombre.lower() in user.nombre.lower()]
    if not results:
        raise HTTPException(status_code=404, detail="No se encontraron usuarios con ese nombre")
    return results

# Buscar por correo (devuelve un solo usuario)
@app.get("/usuarios/correo/{correo}", response_model=User)
def search_by_correo(correo: str):
    for user in users_db:
        if user.correo == correo:
            return user
    raise HTTPException(status_code=404, detail="Correo no encontrado")

# Buscar por documento (devuelve un solo usuario)
@app.get("/usuarios/documento/{documento}", response_model=User)
def search_by_documento(documento: str):
    for user in users_db:
        if user.documento == documento:
            return user
    raise HTTPException(status_code=404, detail="Documento no encontrado")