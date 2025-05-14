from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Habilitar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Puedes reemplazar "*" por "http://localhost:4200"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo de usuario
class User(BaseModel):
    id: int
    nombre: str
    correo: str
    documento: str

# Base de datos simulada
users_db: List[User] = []

# Obtener todos los usuarios
@app.get("/usuarios/", response_model=List[User])
def get_users():
    return users_db

# Crear usuario
@app.post("/usuarios/", response_model=User)
def create_user(user: User):
    for u in users_db:
        if u.id == user.id:
            raise HTTPException(status_code=400, detail="ID ya existe")
    users_db.append(user)
    return user

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

# Buscar por nombre
@app.get("/usuarios/nombre/{nombre}", response_model=List[User])
def search_by_nombre(nombre: str):
    return [user for user in users_db if nombre.lower() in user.nombre.lower()]

# Buscar por correo
@app.get("/usuarios/correo/{correo}", response_model=User)
def search_by_correo(correo: str):
    for user in users_db:
        if user.correo == correo:
            return user
    raise HTTPException(status_code=404, detail="Correo no encontrado")

# Buscar por documento
@app.get("/usuarios/documento/{documento}", response_model=User)
def search_by_documento(documento: str):
    for user in users_db:
        if user.documento == documento:
            return user
    raise HTTPException(status_code=404, detail="Documento no encontrado")