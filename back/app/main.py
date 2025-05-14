from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional
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
def create_user(name: str,document: str, email: str, db: Session = Depends(get_db)):
    return crud.create_user(db, name, email,document)    
               
@app.get("/users/search")
def search_user(
    id: Optional[int] = Query(None),
    name: Optional[str] = Query(None),
    email: Optional[str] = Query(None),
    document: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    user = crud.find_user_by_any_field(db, id=id, name=name, email=email, document=document)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user 


@app.delete("/users/delete_for_id")
def delete_and_return_user(id: int, db: Session = Depends(get_db)):
    user = crud.get_and_delete_user_by_id(db, id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return {"mensaje": "Usuario eliminado", "usuario": {"name": user.name, "email": user.email, "document": user.document}}
