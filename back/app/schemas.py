from pydantic import BaseModel

class CarroBase(BaseModel):
    modelo: int
    marca: str
    serie: str

class CarroCreate(CarroBase):
    pass

class Carro(CarroBase):
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
