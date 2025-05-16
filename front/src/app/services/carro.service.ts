import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getCarros(): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:8000/carros/');
}

  createCars(modelo: number, marca: string, serie: string) {
  return this.http.post('http://localhost:8000/carros/', { modelo, marca, serie });
}
}




