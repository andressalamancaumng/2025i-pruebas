import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definición de la interfaz Carro
export interface Carro {
  id?: number;  // id opcional porque al crear no lo tienes
  modelo: number;
  marca: string;
  serie: string;
}

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl = 'http://localhost:8000'; // URL base de tu API

  constructor(private http: HttpClient) {}

  getCars(): Observable<Carro[]> {
    return this.http.get<Carro[]>(`${this.apiUrl}/carros/`);
  }

  createCarro(modelo: number, marca: string, serie: string): Observable<Carro> {
    const body = { modelo, marca, serie };
    return this.http.post<Carro>(`${this.apiUrl}/carros/`, body);
  }

  deleteCarro(carroId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/carros/${carroId}`);
  }
}
