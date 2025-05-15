from pydantic import BaseModel

class PeliculaBase(BaseModel):
 
    nombrepelicula: int
    director: str
    anio: int

class PeliculaCreate(PeliculaBase):
   
    pass

class Pelicula(PeliculaBase):
 
    id: int

    class Config:
       
        orm_mode = True

class UserBase(BaseModel):
  
    name: str
    email: str

class UserCreate(UserBase):
   
    pass

class User(UserBase):
 
    id: int

    class Config:
       
        orm_mode = True
