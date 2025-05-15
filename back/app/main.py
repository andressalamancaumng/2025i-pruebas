from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, models, database

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/usuarios/")
def crear_usuario(nombre: str, correo: str, documento: str, db: Session = Depends(get_db)):
    return crud.crear_usuario(db, nombre, correo, documento)

@app.delete("/usuarios/{usuario_id}")
def borrar_usuario(usuario_id: int, db: Session = Depends(get_db)):
    eliminado = crud.eliminar_usuario_por_id(db, usuario_id)
    if not eliminado:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return {"mensaje": "Usuario eliminado"}

@app.get("/usuarios/buscar/{valor}")
def buscar_usuario(valor: str, db: Session = Depends(get_db)):
    usuario = crud.buscar_usuario(db, valor)
    if not usuario:
        raise HTTPException(status_code=404, detail="No se encontró el usuario")
    return usuario

<<<<<<< HEAD
=======
@app.get("/users/search")
def search_user(
    user_id: int = None,
    name: str = None,
    email: str = None,
    documento: str = None,
    db: Session = Depends(get_db)):
    if user_id is not None:
        return crud.get_user_by_id(db, user_id)
    if name is not None:
        return crud.get_user_by_name(db, name)
    if email is not None:
        return crud.get_user_by_email(db, email)
    if documento is not None:
        return crud.get_user_by_documento(db, documento)
>>>>>>> b80e8ce685d42545311c67a1fe4a4662ce483d2e
