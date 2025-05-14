from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_movies_empty():
    response = client.get("/movies/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_movie():
    response = client.post("/movies/", params={
        "name": "Matrix",
        "year": 1999,
        "director": "Wachowskis"
    })
    assert response.status_code == 200
    data = response.json()
    assert "id" in data
    assert data["name"] == "Matrix"
    assert data["year"] == 1999
    assert data["director"] == "Wachowskis"
    global created_movie_id
    created_movie_id = data["id"]

def test_get_movie_by_id():
    response = client.get(f"/movies/{created_movie_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == created_movie_id
    assert data["name"] == "Matrix"

def test_get_movie_by_name():
    response = client.get("/movies/Matrix")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Matrix"
    assert data["director"] == "Wachowskis"

def test_delete_movie():
    response = client.delete(f"/movies/{created_movie_id}")
    assert response.status_code == 200
    assert response.json() == {"message": "Movie deleted successfully"}

def test_get_deleted_movie_should_fail():
    response = client.get(f"/movies/{created_movie_id}")
    assert response.status_code == 404
    assert response.json() == {"error": "Movie not found"}
