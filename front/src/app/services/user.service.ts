import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  documento: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/usuarios'; // Cambia la URL si es diferente

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  createUser(nombre: string, correo: string, documento: string): Observable<Usuario> {
    const nuevoUsuario = { nombre, correo, documento };
    return this.http.post<Usuario>(this.apiUrl, nuevoUsuario);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getUserByNombre(nombre: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/buscar?nombre=${nombre}`);
  }

  getUserByCorreo(correo: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/buscar?correo=${correo}`);
  }

  getUserByDocumento(documento: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/buscar?documento=${documento}`);
  }
}