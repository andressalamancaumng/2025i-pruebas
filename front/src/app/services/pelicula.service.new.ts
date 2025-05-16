import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  crearPelicula(nombrepelicula: string, director: string, anio: number) {
    const body = {
      nombrepelicula,
      director,
      anio
    };

    return this.http.post(`${this.baseUrl}/peliculas/`, body);
  }

  obtenerPeliculas() {
    return this.http.get(`${this.baseUrl}/peliculas/`);
  }
}