from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

# Lista vacía para guardar las películas creadas
guardar_peliculas = []

def test_crear_peliculas():
    peliculas = [
        {"nombre": "Cómo Entrenar a tu Dragón", "año": 2010, "director": "Dean DeBlois, Chris Sanders"},
        {"nombre": "The Dirt", "año": 2019, "director": "Jeff Tremaine"},
        {"nombre": "Zombieland", "año": 2009, "director": "Ruben Fleischer"},
        {"nombre": "Son Como Niños", "año": 2010, "director": "Dennis Dugan"},
        {"nombre": "Ted", "año": 2012, "director": "Seth MacFarlane"}
    ]

    for pelicula in peliculas:
        response = client.post("/peliculas/", params=pelicula)
        assert response.status_code == 200
        response_json = response.json()
        assert response_json["nombre"] == pelicula["nombre"]
        assert response_json["año"] == pelicula["año"]
        assert response_json["director"] == pelicula["director"]
        guardar_peliculas.append(response_json)

def test_traer_todas_las_peliculas():
    response = client.get("/peliculas/")
    assert response.status_code == 200
    peliculas_en_db = response.json()
    assert isinstance(peliculas_en_db, list)
    assert len(peliculas_en_db) >= len(guardar_peliculas)  # Verifica que existan las películas creadas

def test_traer_pelicula_por_id():
    for pelicula in guardar_peliculas:
        pelicula_id = pelicula["id"]
        response = client.get(f"/peliculas/{pelicula_id}")
        assert response.status_code == 200
        response_json = response.json()
        assert response_json["nombre"] == pelicula["nombre"]


def test_borrar_peliculas():
    for pelicula in guardar_peliculas:
        pelicula_id = pelicula["id"]
        response = client.delete(f"/peliculas/{pelicula_id}")
        assert response.status_code == 200

        # Luego de borrar, verificar que ya no existe
        response = client.get(f"/peliculas/{pelicula_id}")
        assert response.status_code == 404