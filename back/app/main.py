from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app import models, crud, database
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Crear las tablas en la base de datos
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

@app.get("/")
def home():
    return {"mensaje": "¡La API está funcionando!"}

# Crear un nuevo usuario
@app.post("/usuarios/")
def crear_usuario(nombre: str, correo: str, documento: str, db: Session = Depends(get_db)):
    return crud.crear_usuario(db, nombre, correo, documento)

# Obtener todos los usuarios
@app.get("/usuarios/")
def leer_usuarios(db: Session = Depends(get_db)):
    return crud.obtener_usuarios(db)

# Obtener usuario por ID
@app.get("/usuarios/id/{user_id}")
def obtener_por_id(user_id: int, db: Session = Depends(get_db)):
    usuario = crud.obtener_usuario_por_id(db, user_id)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario

# Ruta para buscar usuarios por nombre, correo o documento (búsqueda genérica)
@app.get("/usuarios/buscar/")
def buscar_usuarios(query: str, db: Session = Depends(get_db)):
    usuarios = crud.buscar_usuarios(db, query)
    if not usuarios:
        raise HTTPException(status_code=404, detail="No se encontraron usuarios")
    return usuarios

# Eliminar un usuario por ID
@app.delete("/usuarios/{user_id}")
def eliminar(user_id: int, db: Session = Depends(get_db)):
    usuario = crud.eliminar_usuario(db, user_id)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return {"mensaje": "Usuario eliminado"}