from pydantic import BaseModel

class CarroBase(BaseModel):
    """
    Esquema base para un carro, utilizado para la validación y serialización de datos.

    Atributos:
        modelo (int): Año del modelo del carro.
        marca (str): Marca del carro.
        serie (str): Serie o referencia del carro.
    """
    modelo: int
    marca: str
    serie: str

class CarroCreate(CarroBase):
    """
    Esquema utilizado para crear un nuevo carro.
    Hereda de CarroBase.
    """
    pass

class Carro(CarroBase):
    """
    Esquema utilizado para representar un carro completo, incluyendo el ID.

    Atributos:
        id (int): Identificador único del carro.
    """
    id: int

    class Config:
        """
        Configuración para habilitar la compatibilidad con objetos ORM.
        """
        orm_mode = True

class UserBase(BaseModel):
    """
    Esquema base para un usuario.

    Atributos:
        name (str): Nombre del usuario.
        email (str): Correo electrónico del usuario.
    """
    name: str
    email: str

class UserCreate(UserBase):
    """
    Esquema utilizado para crear un nuevo usuario.
    Hereda de UserBase.
    """
    pass

class User(UserBase):
    """
    Esquema utilizado para representar un usuario completo, incluyendo el ID.

    Atributos:
        id (int): Identificador único del usuario.
    """
    id: int

    class Config:
        """
        Configuración para habilitar la compatibilidad con objetos ORM.
        """
        orm_mode = True
