from fastapi import FastAPI, Depends, Query, HTTPException, status
from sqlalchemy.orm import Session
from app import models, crud, database
from fastapi.middleware.cors import CORSMiddleware
import logging
from app import schemas
from fastapi import Path
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

models.Base.metadata.create_all(bind=database.engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
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
def create_pelicula(pelicula: schemas.PeliculaCreate, db: Session = Depends(get_db)):
    try:
        nueva_pelicula = crud.create_pelicula(db, pelicula.nombre, pelicula.anio, pelicula.director)
        return nueva_pelicula
    except Exception as e:
        logger.error(f"Error al crear la película: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al crear la película: {str(e)}"
        )


@app.get("/peliculas/listado_peliculas/")
def read_peliculas(db: Session = Depends(get_db)):
    try:
        
        peliculas = crud.get_peliculas(db)
        return peliculas
    except Exception as e:
        
        logger.error(f"Error al obtener el listado de películas: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener el listado de películas: {str(e)}"
        )
@app.delete("/peliculas/{pelicula_id}")
def delete_pelicula(pelicula_id:int,db:Session=Depends(get_db)):
    try:
        pelicula=crud.get_peliculas_id(db,pelicula_id)
        if pelicula is None:
            raise HTTPException(status_code=404,detail="pelicula no encontrada")
        crud.borrar_pelicula(db,pelicula_id)
        return{"mensage": "Pelicula eliminada"}

    except Exception as e:
        logger.error(f"Error al borrar pelicula: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="ERRO ELIMINAR PELI"
        )
    
@app.get("/peliculas/{pelicula_id}",response_model=schemas.Pelicula)
def read_pelicula(pelicula_id: int=Path(...,gt=0),db:Session=Depends(get_db)):
    pelicula =crud.get_peliculas_id(db,pelicula_id)

    if pelicula is None:
        raise HTTPException(status_code=404,detail="Pelicula no encontrada m")
    return pelicula
