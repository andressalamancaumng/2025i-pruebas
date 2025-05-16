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

@app.post("/movies/")
def create_movie(name: str, year: int, name_director: str, db: Session = Depends(get_db)):
    return crud.create_movie(db, name, year, name_director)

@app.get("/movies/")
def read_movies(db: Session = Depends(get_db)):
    return crud.get_movies(db)

@app.get("/movies/{value}")
def read_movie(value: str, db: Session = Depends(get_db)):
    movie = crud.get_movie_by_id_or_name(db, value)
    if not movie:
        return {"error": "Movie not found"}
    return movie

@app.delete("/movies/{movie_id}")
def delete_movie(movie_id: int, db: Session = Depends(get_db)):
    movie = crud.delete_movie(db, movie_id)
    if not movie:
        return {"error": "Movie not found"}
    return {"message": "Movie deleted successfully"}
