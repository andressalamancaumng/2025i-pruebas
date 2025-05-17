from fastapi.testclient import TestClient
from app.models import User
from app.main import app

client = TestClient(app)

def test_create_user():
    response = client.post("/users/", params={"name": "Juan", "email": "juan@example.com", "documento": "1234567"})
    assert response.status_code == 200
    assert response.json()["name"] == "Juan"
    assert response.json()["email"] == "juan@example.com"
    assert response.json()["documento"] == 1234567

def test_read_users():
    response = client.get("/users/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)    

def setup_function():
    from app.database import SessionLocal
    db = SessionLocal()
    db.query(User).delete()
    db.commit()
    db.close()
