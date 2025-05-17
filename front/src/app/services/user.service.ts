import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';


export interface User {
  id: number;
  name: string;
  email: string;
  document: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/');
  }

  createUser(user: { name: string; email: string; document: string }): Observable<any> {
  return this.http.post('http://localhost:8000/users/', user);
}



  deleteUser(userId: number): Observable<any> {
  return this.http.delete(this.apiUrl + '/' + userId);
}

searchUsers(filters: Partial<User>): Observable<User[]> {
  let params = new HttpParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params = params.set(key, value);
    }
  });
  return this.http.get<User[]>(this.apiUrl + '/search', { params });
}


}
