from fastapi.testclient import TestClient
from app.main import app
from app.database import SessionLocal
from sqlalchemy import text

client = TestClient(app)


def reset_database():
    db = SessionLocal()
    db.execute(text("DELETE FROM peliculas"))
    db.execute(text("ALTER TABLE peliculas AUTO_INCREMENT = 1"))
    db.commit()
    db.close()

def test_crear_pelicula():
    reset_database()
    response = client.post("/peliculas/", params={"titulo": "Rio", "year": 2011, "director": "Carlos Saldanha"})
    assert response.status_code == 200
    data = response.json()["pelicula"]
    assert data["titulo"] == "Rio"
    assert data["year"] == 2011
    assert data["director"] == "Carlos Saldanha"

def test_obtener_peliculas():
    reset_database()
    client.post("/peliculas/", params={"titulo": "Jhon Wick", "year": 2014, "director": "Chad stahelski"})
    response = client.get("/peliculas/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_obtener_pelicula():
    reset_database()
    client.post("/peliculas/", params={"titulo": "Frozen", "year": 2013, "director": "Jennifer Lee"})
    response = client.get("/peliculas/1/")
    assert response.status_code == 200

def test_delete_movie():
    reset_database()
    client.post("/pelicula/", params={"titulo": "Titanic", "year": 1997, "director": "James Cameron"})
    response = client.delete("/peliculas/1")
    assert response.status_code == 200