
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

# Lista vacía para guardar las películas creadas
guardar_peliculas = []

def test_crear_peliculas():
    peliculas = [
        {"name": "Cómo Entrenar a tu Dragón", "year": 2010, "name_director": "Dean DeBlois, Chris Sanders"},
        {"name": "Gran Turismo: De Jugador A Corredor", "year": 2023, "name_director": "Neill Blomkamp"},
        {"name": "Meteoro", "year": 2008, "name_director": "Lilly Wachowski,Lana Wachowski"},
        {"name": "Rápidos y furiosos 7", "year": 2015, "name_director": "James Wan"},
        {"name": "Enredados", "year": 2011, "name_director": "Nathan Greno, Byron Howard"}
    ]

    for pelicula in peliculas:
        response = client.post("/movies/", params=pelicula)
        assert response.status_code == 422  # Verifica el código de estado
        response_json = response.json()
        
        # Verifica que la respuesta contenga información del error
        assert "detail" in response_json
        assert isinstance(response_json["detail"], list)

def test_traer_todas_las_peliculas():
    response = client.get("/movies/")
    assert response.status_code == 200
    peliculas_en_db = response.json()
    assert isinstance(peliculas_en_db, list)
    assert len(peliculas_en_db) >= len(guardar_peliculas)  # Verifica que existan las películas creadas

def test_traer_pelicula_por_id():
    for pelicula in guardar_peliculas:
        pelicula_id = pelicula["id"]
        response = client.get(f"/movies/{pelicula_id}")
        assert response.status_code == 200
        response_json = response.json()
        assert response_json["name"] == pelicula["name"]


def test_borrar_peliculas():
    for pelicula in guardar_peliculas:
        pelicula_id = pelicula["id"]
        response = client.delete(f"/movies/{pelicula_id}")
        assert response.status_code == 422

        # Luego de borrar, verificar que ya no existe
        response = client.get(f"/movies/{pelicula_id}")
        assert response.status_code == 404