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

@app.post("/peliculas/")
def create_pelicula(name_movie: str, año: int,director:str, db: Session = Depends(get_db)):
    return crud.create_pelicula(db, name_movie, año,director)

@app.get("/peliculas/")
def read_peliculas(db: Session = Depends(get_db)):
    return crud.get_peliculas(db)
