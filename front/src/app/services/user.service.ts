import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  nombre: string;
  correo: string;
  documento: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000/users';  // Asegúrate que esta sea la URL correcta

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(${this.apiUrl}/);
  }

  // Crear un usuario (envía JSON en el body)
  createUser(nombre: string, correo: string, documento: string): Observable<User> {
    return this.http.post<User>(${this.apiUrl}/, { nombre, correo, documento });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(${this.apiUrl}/${id});
  }

  // Método para buscar usuarios por término (opcional)
  searchUsers(termino: string): Observable<User[] | User> {
    return this.http.get<User[] | User>(${this.apiUrl}/search, {
      params: { q: termino }
    });
  }
}