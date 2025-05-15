from fastapi import FastAPI, Depends , HTTPException
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
def create_movie(title: str, year: int, director: str, db: Session = Depends(get_db)):
    if not title or not year or not director:
        raise HTTPException(status_code=400, detail="Todos los campos son obligatorios")

    existing_movie = crud.get_movie_by_details(db, title, year, director)
    if existing_movie:
        raise HTTPException(status_code=400, detail="La película ya existe")

    movie = crud.create_movie(db, title, year, director)
    return {"detail": "Película creada con éxito", "movie": movie}
       

@app.get("/movies/")
def read_movies(db: Session = Depends(get_db)):
    return crud.get_movies(db)

@app.get("/movies/{title}/")
def read_movie(title: str, db: Session = Depends(get_db)):
    movie = crud.get_movie(db, title = title)
    if not movie:
        raise HTTPException(status_code=404, detail="La película no existe")
    return movie

@app.delete("/movies/{movie_id}")
def delete_movie(movie_id: int, db: Session = Depends(get_db)):
    if not crud.delete_movie(db, movie_id = movie_id):
        raise HTTPException(status_code=404, detail="La película no existe")
    return {"detail": "Película eliminada con éxito"}