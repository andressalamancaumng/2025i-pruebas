import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private apiUrl = 'http://localhost:8000'; // Cambia por tu IP si usas dispositivo físico

  constructor(private http: HttpClient) {}

  getPeliculas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/movies/`);
  }

  crearPelicula(nombre: string, anio: number, director: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/movies/`, {
    params: {
      name_movie: nombre,
      year: anio,
      director: director
      },
    });
  }
}
