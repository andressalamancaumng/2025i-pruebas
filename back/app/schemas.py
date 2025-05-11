from pydantic import BaseModel

# Definición del esquema para la creación de películas
class PeliculaCreate(BaseModel):
    name_movie: str
    anio: int
    director: str
