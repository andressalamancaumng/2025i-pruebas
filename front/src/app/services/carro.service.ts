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
  private url = 'http://localhost:8000/carros/';

  constructor(private http: HttpClient) {}

  obtenerCarros(): Observable<Carro[]> {
    return this.http.get<Carro[]>(this.url);
  }

  crearCarro(carro: Carro): Observable<Carro> {
    return this.http.post<Carro>(this.url, carro);
  }

  eliminarCarro(id: number): Observable<any> {
    return this.http.delete(`${this.url}${id}`);
  }
}




