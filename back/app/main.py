from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app import models, crud, database
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

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

@app.post("/users/")
def create_user(name: str, email: str, db: Session = Depends(get_db)):
    return crud.create_user(db, name, email)

@app.get("/users/")
def read_users(db: Session = Depends(get_db)):
    return crud.get_users(db)

@app.post("/movies/")
def create_movie(name_movie: str, year: int, director: str, db: Session = Depends(get_db)):
    return crud.create_movie(db, name_movie, year, director)

@app.get("/movies/")
def read_users(db: Session = Depends(get_db)):
    return crud.get_movie(db)

@app.get("/movie/{id}")
def read_users(id: int, db: Session = Depends(get_db)):
    return crud.get_movie_by_id(id, db)

@app.delete("/movie/{id}")
def read_users(id: int, db: Session = Depends(get_db)):
    return crud.delete_movie_by_id(id, db)