from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_user():
    response = client.post("/users/", params={"name": "juan", "email": "juan@example.com"})
    assert response.status_code == 200
    assert response.json()["name"] == "juan"

    def test_read_users():
        response = client.get("/users/")
        assert response.status_code == 200
        assert isinstance(response.json(), list)