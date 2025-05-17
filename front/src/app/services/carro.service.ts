import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Carro {
  id?: number;
  modelo: string;
  marca: string;
  serie: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarroService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  obtenerCarros(): Observable<Carro[]> {
    return this.http.get<Carro[]>(`${this.apiUrl}/carros/`);
  }

  eliminarCarro(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/carros/${id}`);
  }

  crearCarro(carro: Carro): Observable<any> {
    return this.http.post(`${this.apiUrl}/carros/`, carro);
  }
}

