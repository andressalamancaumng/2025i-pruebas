import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; // Verifica que esta ruta sea correcta

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000/usuarios'; // Ajusta la URL si tu backend está en otro puerto

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/`);
  }

  // Crear un usuario (envía JSON en el body)
  createUser(nombre: string, correo: string, documento: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/`, {
      nombre,
      correo,
      documento
    });
  }

  // Eliminar un usuario por ID
  deleteUser(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  // Buscar usuarios por nombre, correo o documento
  searchUsers(query: string): Observable<User | User[]> {
    if (!isNaN(Number(query))) {
      // Si es un número, busca por documento
      return this.http.get<User>(`${this.apiUrl}/documento/${query}`);
    } else if (query.includes('@')) {
      // Si contiene @, busca por correo
      return this.http.get<User>(`${this.apiUrl}/correo/${query}`);
    } else {
      // Si es texto, busca por nombre (puede devolver varios)
      return this.http.get<User[]>(`${this.apiUrl}/nombre/${query}`);
    }
  }

  // Obtener un usuario por ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/id/${id}`);
  }
}