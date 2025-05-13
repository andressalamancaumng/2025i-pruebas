// Importa el decorador Injectable para declarar este servicio como inyectable
import { Injectable } from '@angular/core';

// Importa el cliente HTTP para realizar peticiones al backend
import { HttpClient } from '@angular/common/http';

// Importa Observable para trabajar con datos asincrónicos
import { Observable } from 'rxjs';

// Declara que este servicio estará disponible a nivel global (en toda la app)
@Injectable({
  providedIn: 'root',
})
export class CarroService {
  // URL base del backend FastAPI
  private apiUrl = 'http://localhost:8000';

  // Inyecta el HttpClient para hacer llamadas HTTP
  constructor(private http: HttpClient) {}

  // Método para obtener todos los carros desde el backend
  getCarros(): Observable<any> {
    return this.http.get(`${this.apiUrl}/carros/`);
  }

  // Método para crear un nuevo carro en el backend
  createCarro(carro: { modelo: number; marca: string; serie: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/carros/`, carro);
  }
}
