import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pelicula
{
  id: number;
  name_movie: string;
  anio:number;
  director:string;

}


@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  obtenerPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(`${this.apiUrl}/peliculas/`);
  }

  createPelicula(name_movie: string, año: number,director:string): Observable<any> {
    return this.http.post(`${this.apiUrl}/peliculas/`, null, {
      params: { name_movie,año,director },
    });
  }
}
