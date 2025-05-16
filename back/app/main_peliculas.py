from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app import crud, models

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

        @app.get("/peliculas")
        def leer_peliculas(db Session = Depends(get_db)):
            return crud.get_peliculas(db)
        
        @app.get("/peliculas/{pelicula_id}")
        def leer_pelicula_por_id(pelicula_id: int, db: Session = Depends(get_db)):
            pelicula = crud.get_pelicula_by_id(db, pelicula_id)
            if pelicula is None:
                raise HTTPException(status_code=404, detail="Pelicula no encontrada")
            return pelicula
        
        @app.delete("/peliculas/{pelicula_id}")
        def eliminar_pelicula(pelicula_id: int, db: Session = Depends(get_db)):
            resultado = crud.delete_pelicula(db, pelicula_id)
            if not resultado:
                raise HTTPException(status_code=404, detail= "Pelicula no encontrada")
            return {"mensaje": "Pelicula eliminada exitosamente"}