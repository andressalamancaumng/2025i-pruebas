import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000'; // Asegúrate de que esta URL sea correcta según tu API

  constructor(private http: HttpClient) {}

  // Método para obtener todos los usuarios
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/`);
  }

  // Método para crear un nuevo usuario
  createUser(name: string, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/`, null, {
      params: { name, email },
    });
  }

  // Método para eliminar un usuario por ID
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}
