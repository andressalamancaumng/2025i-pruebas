import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Carro {
  modelo: string;
  marca: string;
  serie: string;
  id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarroService {
  private API_URL = 'http://localhost:8000'; // Ajusta el puerto según tu backend FastAPI

  constructor(private http: HttpClient) {}

  crearCarro(carro: Carro): Observable<Carro> {
    return this.http.post<Carro>(`${this.API_URL}/carros/`, carro);
  }

  obtenerCarros(): Observable<Carro[]> {
    return this.http.get<Carro[]>(`${this.API_URL}/carros/`);
  }

  eliminarCarro(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/carros/${id}`);
  }
}


