from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_user():
    response = client.post("/users/", params={"name": "Juan", "email": "juan@example.com"})
    assert response.status_code == 200
    assert response.json()["name"] == "Juan" 

def test_create_movie():
    response = client.post("/movies/", params={"name_movie": "Karate kid", "year": "1997", "director": "Helen"})
    assert response.status_code == 200
    assert response.json()["name_movie"] == "Karate kid" 

def test_read_users():
    response = client.get("/users/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_read_movies():
    response = client.get("/movies/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
