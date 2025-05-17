import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  private apiUrl = 'http://localhost:8000/usuarios'; // Cambia al puerto y URL de tu FastAPI

  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl + '/');
  }

  // Buscar usuarios por criterio (nombre, correo o documento)
  buscarUsuarios(criterio: string, valor: string): Observable<Usuario[]> {
    let url = '';
    switch(criterio) {
      case 'nombre':
        url = `${this.apiUrl}/nombre/${valor}`;
        break;
      case 'correo':
        url = `${this.apiUrl}/correo/${valor}`;
        break;
      case 'documento':
        url = `${this.apiUrl}/documento/${valor}`;
        break;
      default:
        url = `${this.apiUrl}/`;
    }
    return this.http.get<Usuario[]>(url);
  }

  // Eliminar usuario por ID
  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}