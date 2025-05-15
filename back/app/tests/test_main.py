from fastapi.testclient import TestClient
from back.app.main import app

client = TestClient(app)

def test_create_pelicula():
    response = client.post("/peliculas/", json={"nombrepelicula": "jackiechan8", "director": "CHinCHan", "año": "2010"})
    assert response.status_code == 200
    data = response.json()
    assert data["nombrepelicula"] == "jackiechan8"
    assert data["director"] == "CHinCHan"
    assert data["año"] == "2010"
    assert "id" in data

def test_read_peliculas():
    response = client.get("/peliculas/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_read_pelicula_by_id():
    # First create a pelicula
    create_response = client.post("/peliculas/", json={"nombrepelicula": "jackiechan8", "director": "CHinCHan", "anio": "2010"})
    pelicula_id = create_response.json()["id"]
    # Now get by id
    response = client.get(f"/peliculas/{pelicula_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == pelicula_id

def test_delete_pelicula_by_details():
    # First create a pelicula
    create_response = client.post("/peliculas/", json={"nombrepelicula": "jackiechan8", "director": "CHinCHan", "anio": "2010"})
    pelicula_id = create_response.json()["id"]
    # Now delete by details
    response = client.delete("/peliculas/", params={"pelicula_id": pelicula_id, "nombrepelicula": "jackiechan8", "director": "CHinCHan"})
    assert response.status_code == 200
    assert response.json() == {"message": "Pelicula eliminado por id"}
