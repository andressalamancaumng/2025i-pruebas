// Importa HttpClient para realizar solicitudes HTTP
import { HttpClient } from '@angular/common/http';
// Importa Injectable para que el servicio pueda inyectarse en otros componentes
import { Injectable } from '@angular/core';

// Decorador que indica que este servicio estará disponible en toda la aplicación
@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  // URL base del backend (FastAPI en este caso)
  private baseUrl = 'http://localhost:8000';

  // Constructor que inyecta el cliente HTTP
  constructor(private http: HttpClient) {}

  // Método para crear una nueva película
  crearPelicula(nombrepelicula: string, director: string, anio: number) {
    const body = {
      nombrepelicula,
      director,
      anio
    };

    // Envía una solicitud POST al backend con los datos de la película
    return this.http.post(`${this.baseUrl}/peliculas/`, body);
  }

  // Método para obtener todas las películas
  obtenerPeliculas() {
    // Envía una solicitud GET al backend para traer la lista de películas
    return this.http.get(`${this.baseUrl}/peliculas/`);
  }
}
