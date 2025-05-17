//Servicio de los carros
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Carro {
  id?: number;
  modelo: number | null;
  marca: string;
  serie: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarroService {
  private apiUrl = 'http://localhost:8000/carros';  // Cambiar si usas Docker y accedes desde otro host

  constructor(private http: HttpClient) {}

  getCarros(): Observable<Carro[]> {
    return this.http.get<Carro[]>(`${this.apiUrl}/`);
  }

  getCarro(id: number): Observable<Carro> {
    return this.http.get<Carro>(`${this.apiUrl}/${id}`);
  }

  crearCarro(carro: Carro): Observable<Carro> {
    return this.http.post<Carro>(`${this.apiUrl}/`, carro);  // ajusta el endpoint si usas create_carro_manual
  }

  eliminarCarro(id: number): Observable<Carro> {
    return this.http.delete<Carro>(`${this.apiUrl}/${id}`);
  }
}