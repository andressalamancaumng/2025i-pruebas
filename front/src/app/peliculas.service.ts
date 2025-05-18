import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pelicula {
  id: number;
  nombre: string;
  anio: number;
  director: string;
}

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private apiUrl = 'http://localhost:8000/peliculas/';

  constructor(private http: HttpClient) { }

  // Obtener todas las películas
  getPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.apiUrl);
  }

  // Crear una nueva película
  createPelicula(nombre: string, anio: number, director: string): Observable<Pelicula> {
    return this.http.post<Pelicula>(this.apiUrl, { nombre, anio, director });
  }
  getPeliculaById(id: number): Observable<Pelicula> {
    return this.http.get<Pelicula>(`${this.apiUrl}${id}`);
  }

  // Eliminar una película por ID
  deletePelicula(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }
}
