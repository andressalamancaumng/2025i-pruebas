import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ipeliculas{
  titulo: string;
  ID: number;
  anio: number;
  director: string;
}

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private apiUrl = 'mysql+pymysql://root:123456@localhost/testdb';

  constructor(private http: HttpClient) {

  }

  /*
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/`);
  }

  createUser(name: string, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/`, null, {
      params: { name, email },
    });
  } */


  crearPelis(pelicula: Ipeliculas): Observable<Ipeliculas> {
    return this.http.post<Ipeliculas>(`${this.apiUrl}`, pelicula);
  }

  getPelis(): Observable<Ipeliculas[]> {
    return this.http.get<Ipeliculas[]>(`${this.apiUrl}`);
  }

  getPeliID(ID: number): Observable<Ipeliculas> {
    return this.http.get<Ipeliculas>(`${this.apiUrl}/${ID}`);
  }

  eliminarPelicula(ID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${ID}`);
  }

  

}
