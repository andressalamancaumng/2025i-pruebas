from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_cars():
    response = client.post("/cars/", params={"modelo": "2010", "marca": "Ford","serie": "Explorer"})
    assert response.status_code == 200
    assert response.json()["modelo"] == "2010" 

def test_read_cars():
    response = client.get("/cars/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
