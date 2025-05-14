import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000'; // URL del backend FastAPI

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/`);
  }

  // Crear un nuevo usuario
  createUser(name: string, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/`, null, {
      params: new HttpParams().set('name', name).set('email', email),
    });
  }

  // Eliminar un usuario por ID
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }

  // Buscar usuarios por nombre, correo o documento
  searchUsers(query: string): Observable<any> {
    const params = new HttpParams().set('query', query);
    return this.http.get(`${this.apiUrl}/users/search/`, { params });
  }
}