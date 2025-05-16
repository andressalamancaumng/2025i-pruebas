import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carros',
  templateUrl: './carros.page.html',  
  styleUrls: ['./carros.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class carrosPage {
  nuevoModelo: number = 0;
  nuevaMarca: string = '';
  nuevaSerie: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  crearCarro() {
    this.http.post('http://localhost:8000/carros/', {
      modelo: this.nuevoModelo,
      marca: this.nuevaMarca,
      serie: this.nuevaSerie
    }).subscribe(res => {
      console.log('✅ Carro creado:', res);
      this.router.navigate(['/listado-carros']);
    });
  }
}



