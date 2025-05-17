import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private apiUrl = 'http://localhost:8000'; // Cambia si tu backend tiene otro puerto o dominio

  constructor(private http: HttpClient) {}

  obtenerCarros(): Observable<Carro[]> {
    return this.http.get<Carro[]>(`${this.apiUrl}/carros`);
  }

  crearCarro(carro: Carro): Observable<Carro> {
    return this.http.post<Carro>(`${this.apiUrl}/carros`, carro);
  }

  eliminarCarro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/carros/${id}`);
  }
}



