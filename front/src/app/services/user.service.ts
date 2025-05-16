import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/`);
  }

<<<<<<< HEAD
  createUser(name: string, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/`, null, {
      params: { name, email },
    });
  }
=======
  // Crear un usuario (envía JSON en el body)
  createUser(nombre: string, correo: string, documento: string) {
  return this.http.post<User>(`${this.apiUrl}`, { nombre, correo, documento });
}
>>>>>>> 0588082311a5b810d900046bcb4052ee7d9b75de

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}