from fastapi import FastAPI, Depends, HTTPException
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

@app.get("/movies/search/")
def movie_by_id_or_name(movie_id: int=None, name: str=None,db:Session = Depends(get_db)):
    return crud.movie_id_or_name(db,movie_id,name)

@app.delete("/movies/{movie_id}")
def delete_movie(movie_id: int, db:Session=Depends(get_db)):
    try:
        crud.delete_movie(db, movie_id)
        return {"message": "Película eliminada con éxito"}
    except ValueError:
        raise HTTPException(status_code=404, detail="Película no encontrada")