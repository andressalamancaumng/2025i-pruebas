from sqlalchemy.orm import Session
from . import models

from sqlalchemy.orm import Session
from .models import Carro

def seed_initial_data(db: Session):
    """
    Inserta datos iniciales de ejemplo en la base de datos.

    Args:
        db (Session): Sesión activa de la base de datos.
    
    Nota:
        Actualmente, esta función no limpia previamente la tabla Carro,
        simplemente inserta un registro de ejemplo.
    """
    # Esta función no realiza ninguna acción para limpiar la tabla Carro
    pass

    # Crea un carro de ejemplo
    car1 = models.Carro(modelo=2020, marca="chevrolet", serie="sail")
    
    # Agrega el carro a la base de datos y guarda los cambios
    db.add(car1)
    db.commit()
