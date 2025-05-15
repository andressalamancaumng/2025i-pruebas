from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_crear_usuario():
    response = client.post("/usuarios/", params={
        "nombre": "Pedro",
        "correo": "pedro@test.com",
        "documento": "ABC123"
    })
    assert response.status_code == 200
    assert response.json()["nombre"] == "Pedro"

def test_buscar_usuario():
    # Buscar por nombre
    response = client.get("/usuarios/buscar/Pedro")
    assert response.status_code == 200
    assert response.json()["correo"] == "pedro@test.com"

def test_eliminar_usuario():
    # Supongamos que el ID del usuario creado es 1
    response = client.delete("/usuarios/1")
    assert response.status_code == 200
    assert response.json()["mensaje"] == "Usuario eliminado"

def test_buscar_usuario_no_existente():
    response = client.get("/usuarios/buscar/NoExiste")
    assert response.status_code == 404
