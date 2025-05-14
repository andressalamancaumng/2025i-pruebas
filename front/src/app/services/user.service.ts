import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000/usuarios'; // FastAPI base URL

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  createUser(nombre: string, correo: string, documento: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, null, {
      params: { nombre, correo, documento },
    });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  searchUsers(query: string): Observable<any> {
    // Prioridad: documento > correo > nombre
    if (!isNaN(Number(query))) {
      return this.http.get(`${this.apiUrl}/documento/${query}`);
    } else if (query.includes('@')) {
      return this.http.get(`${this.apiUrl}/correo/${query}`);
    } else {
      return this.http.get(`${this.apiUrl}/nombre/${query}`);
    }
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/id/${id}`);
  }
}