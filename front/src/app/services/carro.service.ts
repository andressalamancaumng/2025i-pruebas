// Importa el decorador Injectable para que este servicio pueda inyectarse en otros componentes
import { Injectable } from '@angular/core';

// Importa HttpClient para realizar peticiones HTTP al backend
import { HttpClient } from '@angular/common/http';

// Importa Observable para trabajar con flujos de datos asincrónicos
import { Observable } from 'rxjs';

// Define la interfaz Carro para tipar los objetos que maneja el servicio
export interface Carro {
  id?: number;      // ID opcional, ya que es generado por el backend
  modelo: number;   // Año del modelo del carro
  marca: string;    // Marca del carro (ej: Toyota, Ford)
  serie: string;    // Serie o línea del carro
}

// Declara el servicio y lo registra como disponible en toda la aplicación
@Injectable({
  providedIn: 'root',
})
export class CarroService {
  // URL base para las peticiones al backend FastAPI
  private apiUrl = 'http://localhost:8000/carros/';

  // Inyecta el cliente HTTP en el constructor
  constructor(private http: HttpClient) {}

  // Obtiene la lista de carros desde el backend
  getCarros(): Observable<Carro[]> {
    return this.http.get<Carro[]>(this.apiUrl);
  }

  // Envía un nuevo carro al backend para que sea creado
  createCarro(carro: Carro): Observable<Carro> {
    return this.http.post<Carro>(this.apiUrl, carro);
  }
}
