from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_pelicula():
    response = client.post("/peliculas/", params={"name_movie": "Inception", "anio": "2010","director":"Cristopher Nolan"})
    assert response.status_code == 200
    assert response.json()["name_movie"] == "Inception" 

def test_get_pelicula():
    response = client.get("/peliculas/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_pelicula_id():
    create_response =client.post("/peliculas/", params={"name_movie": "Titanic","anio":1997,"director":"James Cameron"})
    pelicula_id = create_response.json()["id"]

    response=client.get(f"/peliculas/{pelicula_id}")
    assert response.status_code==200
    assert response.json()["name_movie"]=="Titanic"

def test_borrar_pelicula():
    create_response = client.post("/peliculas/", params={"name_movie":"Avatar","anio":2009,"director":"James Cameron"})
    pelicula_id=create_response.json()["id"]

    delete_response= client.delete(f"/peliculas/{pelicula_id}")
    assert delete_response.status_code==200 or delete_response.status_code ==204