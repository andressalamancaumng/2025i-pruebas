from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_pelicula():
    response = client.post(
        "/peliculas/",
        json={
            "nombre": "Inception",
            "anio": 2010,
            "director": "Christopher Nolan"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["nombre"] == "Inception"
    assert data["anio"] == 2010
    assert data["director"] == "Christopher Nolan"
