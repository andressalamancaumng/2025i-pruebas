from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_user():
    response = client.post("/users/", params={"name": "Juan", "email": "juan@example.com"})
    assert response.status_code == 200
    assert response.json()["name"] == "Juan" 

def test_read_users():
    response = client.get("/users/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_carro():
    response = client.post("/carros/", json={"modelo": 2020, "marca": "Toyota", "serie": "ABC123"})
    assert response.status_code == 200
    data = response.json()
    assert data["modelo"] == 2020
    assert data["marca"] == "Toyota"
    assert data["serie"] == "ABC123"
    assert "id" in data

def test_get_carros():
    response = client.get("/carros/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_carro_by_id():
    # First create a car to get its id
    create_response = client.post("/carros/", json={"modelo": 2021, "marca": "Honda", "serie": "XYZ789"})
    assert create_response.status_code == 200
    carro_id = create_response.json()["id"]

    response = client.get(f"/carros/{carro_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == carro_id
    assert data["marca"] == "Honda"

def test_delete_carro():
    # First create a car to get its id
    create_response = client.post("/carros/", json={"modelo": 2019, "marca": "Ford", "serie": "LMN456"})
    assert create_response.status_code == 200
    carro_id = create_response.json()["id"]

    response = client.delete(f"/carros/{carro_id}")
    assert response.status_code == 200
    assert response.json() == {"message": "Carro eliminado"}

    # Verify deletion
    get_response = client.get(f"/carros/{carro_id}")
    assert get_response.status_code == 404
