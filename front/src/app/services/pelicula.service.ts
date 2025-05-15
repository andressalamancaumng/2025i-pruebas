// Importa el decorador Injectable para que este servicio pueda inyectarse en otros componentes
import { Injectable } from '@angular/core';

// Importa HttpClient para realizar peticiones HTTP al backend
import { HttpClient } from '@angular/common/http';

// Importa Observable para trabajar con flujos de datos asincrónicos
import { Observable } from 'rxjs';

// Define la interfaz  para tipar los objetos que maneja el servicio
export interface Pelicula {
  id?: number;    
  nombrepelicula: string;  
  director: string;   
  anio: number;   
}

// Declara el servicio y lo registra como disponible en toda la aplicación
@Injectable({
  providedIn: 'root',
})
export class PeliculaService {
  // URL base para las peticiones al backend FastAPI
  private apiUrl = 'http://localhost:8000/peliculas/';

  // Inyecta el cliente HTTP en el constructor
  constructor(private http: HttpClient) {}

  // Obtiene la lista de carros desde el backend
  getPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.apiUrl);
  }

  // Envía un nuevo  al backend para que sea creado
  createPelicula(pelicula: Pelicula): Observable<Pelicula> {
    return this.http.post<Pelicula>(this.apiUrl, pelicula);
  }
}
