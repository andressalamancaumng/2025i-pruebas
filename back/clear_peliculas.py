# Importa la sesión de base de datos desde el módulo app.database
from app.database import SessionLocal

# Importa el método 'text' para ejecutar sentencias SQL sin procesar
from sqlalchemy import text

# ======================================
# Función para eliminar todas las películas de la base de datos
# ======================================
def clear_peliculas():
    # Se crea una nueva sesión de base de datos
    db = SessionLocal()
    try:
        # Ejecuta una sentencia SQL pura para eliminar todas las filas de la tabla 'peliculas'
        db.execute(text("DELETE FROM peliculas"))
        # Confirma los cambios en la base de datos
        db.commit()
    finally:
        # Cierra la sesión, asegurando que no quede abierta
        db.close()

# ======================================
# Punto de entrada del script
# ======================================
if __name__ == "__main__":
    # Llama a la función para eliminar las películas si el archivo se ejecuta directamente
    clear_peliculas()
    print("Datos de peliculas eliminados correctamente.")
