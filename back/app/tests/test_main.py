from fastapi.testclient import TestClient
from back.app.main import app

client = TestClient(app)

def test_create_carro():
    response = client.post("/carros/", json={"modelo": 2020, "marca": "Toyota", "serie": "XYZ123"})
    assert response.status_code == 200
    data = response.json()
    assert data["modelo"] == 2020
    assert data["marca"] == "Toyota"
    assert data["serie"] == "XYZ123"
    assert "id" in data

def test_read_carros():
    response = client.get("/carros/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_read_carro_by_id():
    # First create a carro
    create_response = client.post("/carros/", json={"modelo": 2021, "marca": "Honda", "serie": "ABC987"})
    carro_id = create_response.json()["id"]
    # Now get by id
    response = client.get(f"/carros/{carro_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == carro_id

def test_delete_carro_by_details():
    # First create a carro
    create_response = client.post("/carros/", json={"modelo": 2019, "marca": "Ford", "serie": "LMN456"})
    carro_id = create_response.json()["id"]
    # Now delete by details
    response = client.delete("/carros/", params={"carro_id": carro_id, "modelo": 2019, "marca": "Ford"})
    assert response.status_code == 200
    assert response.json() == {"message": "Carro eliminado por detalles"}
