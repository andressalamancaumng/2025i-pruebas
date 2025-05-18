import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getCars(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cars/`);
  }

  createCar(modelo: string, marca: string, serie: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/cars/`,null, {
      params: {modelo,
      marca,
      serie},
    });
  }
}
