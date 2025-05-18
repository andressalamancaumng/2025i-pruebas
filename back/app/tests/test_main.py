from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

guardar_carros = []

def test_crear_carros():
    carros = [
  {"marca": "Toyota", "modelo": 2022, "serie": "Corolla XSE"},
  {"marca": "Ford", "modelo": 2021, "serie": "Mustang GT Premium"},
  {"marca": "Chevrolet", "modelo": 2020, "serie": "Camaro ZL1"},
  {"marca": "Honda", "modelo": 2023, "serie": "Civic Sport Touring"},
  {"marca": "BMW", "modelo": 2021, "serie": "Serie 3 330i M Sport"}
]

    for carro in carros:
        response = client.post("/carros/", params=carro)
        assert response.status_code == 422  # Verifica el código de estado
        response_json = response.json()
        
        # Verifica que la respuesta contenga información del error
        assert "detail" in response_json
        assert isinstance(response_json["detail"], list)

def test_traer_todos_los_carros():
    response = client.get("/carros/")
    assert response.status_code == 200
    carros_en_db = response.json()
    assert isinstance(carros_en_db, list)
    assert len(carros_en_db) >= len(guardar_carros) 

def test_traer_carro_por_id():
    for carro in guardar_carros:
        carro_id = carro["id"]
        response = client.get(f"/carros/{carro_id}")
        assert response.status_code == 200
        response_json = response.json()
        assert response_json["marca"] == carro["marca"]


def test_borrar_carros():
    for carro in guardar_carros:
        carro_id = carro["id"]
        response = client.delete(f"/carros/{carro_id}")
        assert response.status_code == 422

        # Luego de borrar, verificar que ya no existe
        response = client.get(f"/carros/{carro_id}")
        assert response.status_code == 404