from sqlalchemy.orm import Session
from . import models

from sqlalchemy.orm import Session
from .models import Pelicula

def seed_initial_data(db: Session):
   
    # Esta función no realiza ninguna acción para limpiar la tabla Carro
    pass

    # Crea un carro de ejemplo
    pel1 = models.Pelicula(nombrepelicula=2020, director="Nick valentine", anio="2001")
    
    # Agrega el carro a la base de datos y guarda los cambios
    db.add(pel1)
    db.commit()
