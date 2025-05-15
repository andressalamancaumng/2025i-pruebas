from app.database import SessionLocal
from sqlalchemy import text

def clear_peliculas():
    db = SessionLocal()
    try:
        db.execute(text("DELETE FROM peliculas"))
        db.commit()
    finally:
        db.close()

if __name__ == "__main__":
    clear_peliculas()
    print("Datos de peliculas eliminados correctamente.")
