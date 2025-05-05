from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, crud, database
from pydantic import BaseModel

app = FastAPI()
user_id = None

models.Base.metadata.create_all(bind=database.engine)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic model for input validation
class UserCreate(BaseModel):
    name: str
    email: str
    document: str

@app.post("/users/")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db, user.name, user.email, user.document)

@app.get("/users/")
def read_users(db: Session = Depends(get_db)):
    return crud.get_users(db)

@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    result = crud.delete_user(db, user_id)
    if "error" in result:
        raise HTTPException(status_code=404, detail=result["error"])
    return result

@app.get("/users/search")
def search_user(
    id: int = None, name: str = None, email: str = None, document: str = None,
    db: Session = Depends(get_db)
):
    result = crud.get_user_by_fields(db, id, name, email, document)
    if result is None:
        raise HTTPException(status_code=404, detail="User not found")
    return result
