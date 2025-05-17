import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PeliculaService {
  private apiUrl = 'http://localhost:8000/peliculas'; 

  constructor(private http: HttpClient) {}

  obtenerPeliculas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerPeliculaPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  crearPelicula(titulo: string, year: number, director: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, null, {
      params: { titulo, year: year.toString(), director },
    });
  }

  borarPelicula(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
