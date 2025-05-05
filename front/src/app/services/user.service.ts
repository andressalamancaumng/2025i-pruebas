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

  createUser(name: string, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/`, null, {
      params: { name, email },
    });
  }
}
