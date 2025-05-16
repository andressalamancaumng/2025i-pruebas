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
  private apiUrl = 'http://127.0.0.1:8000/peliculas';

  constructor(private http: HttpClient) {}

  obtenerPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(`${this.apiUrl}/listado_peliculas/`);
  }

  
obtenerPeliculaPorId(id: number): Observable<Pelicula> {
  return this.http.get<Pelicula>(`${this.apiUrl}/${id}`);
}


  crearPelicula(pelicula: { name_movie: string, anio?: number, director: string }): Observable<any> {
    return this.http.post(this.apiUrl+ '/', pelicula);
  }


  borrarPelicula(id:number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

  
}
