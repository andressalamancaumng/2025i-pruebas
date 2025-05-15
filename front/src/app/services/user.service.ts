import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; // Asegúrate de que esta ruta sea correcta

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000/usuarios'; // Ruta base del backend

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/`);
  }

  // Crear un usuario (envía JSON en el body)
  createUser(nombre: string, correo: string, documento: string) {
  return this.http.post<User>(`${this.apiUrl}`, { nombre, correo, documento });
}

  // Eliminar un usuario por ID
  deleteUser(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  // Buscar usuarios por nombre, correo o documento
  searchUsers(query: string): Observable<User | User[]> {
    if (!isNaN(Number(query))) {
      return this.http.get<User>(`${this.apiUrl}/documento/${query}`);
    } else if (query.includes('@')) {
      return this.http.get<User>(`${this.apiUrl}/correo/${query}`);
    } else {
      return this.http.get<User[]>(`${this.apiUrl}/nombre/${query}`);
    }
  }

  // Obtener un usuario por ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/id/${id}`);
  }
}