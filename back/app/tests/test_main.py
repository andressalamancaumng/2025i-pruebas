from fastapi.testclient import TestClient
from app.main import app
from sqlalchemy import text
from app.database import SessionLocal

client = TestClient(app)

def reset_database():
    db = SessionLocal()
    db.execute(text("DELETE FROM movies"))
    db.execute(text("ALTER TABLE movies AUTO_INCREMENT = 1"))
    db.commit()
    db.close()

def test_create_movie():
    reset_database()
    response = client.post("/movies/", params={"title": "Inception", "year": 2010, "director": "Christopher Nolan"})
    assert response.status_code == 200
    data = response.json()["movie"]
    assert data["title"] == "Inception"
    assert data["year"] == 2010
    assert data["director"] == "Christopher Nolan"

def test_read_movies():
    reset_database()
    client.post("/movies/", params={"title": "Matrix", "year": 1999, "director": "Wachowski"})
    response = client.get("/movies/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_read_movie():
    reset_database()
    client.post("/movies/", params={"title": "Avatar", "year": 2009, "director": "James Cameron"})
    response = client.get("/movies/Avatar/")
    assert response.status_code == 200

def test_read_movie_by_details():
    reset_database()
    client.post("/movies/", params={"title": "The Dark Knight", "year": 2008, "director": "Christopher Nolan"})
    response = client.get("/movies/The Dark Knight/")
    assert response.status_code == 200

def test_delete_movie():
    reset_database()
    client.post("/movies/", params={"title": "Titanic", "year": 1997, "director": "James Cameron"})
    response = client.delete("/movies/1")
    assert response.status_code == 200