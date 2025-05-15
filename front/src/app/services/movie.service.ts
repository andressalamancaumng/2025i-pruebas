import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'http://localhost:8000/movies';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/`);
  }

  getMovieById(title: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${title}`);
  }

  createMovie(title: string, year: number, director: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, null, {
      params: { title, year: year.toString(), director },
    });
  }

  deleteMovie(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
