from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, crud, database

app = FastAPI()

# Crear las tablas en la base de datos
models.Base.metadata.create_all(bind=database.engine)

# Dependencia para obtener la sesión de base de datos
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def home():
    return {"mensaje": "¡La API está funcionando!"}

@app.post("/usuarios/")
def crear_usuario(nombre: str,correo:str,documento:str, db: Session = Depends(get_db)):
    return crud.crear_usuario(db, nombre, correo, documento)

@app.get("/usuarios/")
def leer_usuarios(db: Session = Depends(get_db)):
    return crud.obtener_usuarios(db)

@app.get("/usuarios/id/{user_id}")
def obtener_por_id(user_id: int, db: Session = Depends(get_db)):
    usuario = crud.obtener_usuario_por_id(db, user_id)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario

@app.get("/usuarios/nombre/{nombre}")
def obtener_por_nombre(nombre: str, db: Session = Depends(get_db)):
    usuario = crud.obtener_usuario_por_nombre(db, nombre)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario

@app.get("/usuarios/correo/{correo}")
def obtener_por_correo(correo: str, db: Session = Depends(get_db)):
    usuario = crud.obtener_usuario_por_correo(db, correo)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario

@app.get("/usuarios/documento/{documento}")
def obtener_por_documento(documento: str, db: Session = Depends(get_db)):
    usuario = crud.obtener_usuario_por_documento(db, documento)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario

@app.delete("/usuarios/{user_id}")
def eliminar(user_id: int, db: Session = Depends(get_db)):
    usuario = crud.eliminar_usuario(db, user_id)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return {"mensaje": "Usuario eliminado"}