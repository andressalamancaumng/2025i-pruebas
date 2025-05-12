import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Carro {
  id?: number;
  modelo: number;
  marca: string;
  serie: string;
}

@Injectable({
  providedIn: 'root',
})
export class CarroService {
  private apiUrl = 'http://localhost:8000/carros/';

  constructor(private http: HttpClient) {}

  getCarros(): Observable<Carro[]> {
    return this.http.get<Carro[]>(this.apiUrl);
  }

  createCarro(carro: Carro): Observable<Carro> {
    return this.http.post<Carro>(this.apiUrl, carro);
  }
}
