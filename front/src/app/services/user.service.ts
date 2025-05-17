import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  documento: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000/usuarios'; // Ajusta si es diferente

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/`);
  }

  // Crear usuario
  crearUsuario(usuario: Omit<Usuario, 'id'>): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/`, usuario);
  }

  // Eliminar por ID
  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Buscar por nombre
  buscarPorNombre(nombre: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/nombre/${nombre}`);
  }

  // Buscar por correo
  buscarPorCorreo(correo: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/correo/${correo}`);
  }

  // Buscar por documento
  buscarPorDocumento(documento: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/documento/${documento}`);
  }
}