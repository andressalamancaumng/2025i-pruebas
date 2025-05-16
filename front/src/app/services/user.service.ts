import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies/`);
  }

  createMovie(movie: string, year: number, name_director:string): Observable<any> {
    return this.http.post(`${this.apiUrl}/movies/`, null, {
      params: { movie, year, name_director },
    });
  }
}
