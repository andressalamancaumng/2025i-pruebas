import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarroService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getCarros(): Observable<any> {
    return this.http.get(`${this.apiUrl}/carros/`);
  }

  createCarro(carro: { modelo: number; marca: string; serie: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/carros/`, carro);
  }
}
