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

  createUser(name: string, email: string, document: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/`, null, {
      params: { name, email, document },
    });
  }

  searchUser(id?: number, name?: string, email?: string, document?: string): Observable<any> {
    let params: any = {};
    if (id) params.id = id;
    if (name) params.name = name;
    if (email) params.email = email;
    if (document) params.document = document;

    return this.http.get(`${this.apiUrl}/user/`, { params });
  }

  deleteUserFlexible(id?: number): Observable<any> {
    if (id) return this.http.delete(`${this.apiUrl}/users/${id}`);
    throw new Error("Debe proporcionar un ID para eliminar");
  }
}


