import { Component } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CarsService } from '../../services/carro.service';  
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carros', // ✅ Nuevo selector apropiado
  standalone: true,
  imports: [IonicModule, NgFor, NgIf, FormsModule, AsyncPipe, RouterLink],
  templateUrl: './carros.page.html', 
  styleUrls: ['./carros.page.scss'], 
})
export class CarrosPage {
  nuevoModelo: number = 0;
  nuevaMarca: string = '';
  nuevaSerie: string = '';

  constructor(private carroService: CarsService) {}

  crearCarro() {
    if (!this.nuevoModelo || !this.nuevaMarca || !this.nuevaSerie) return;

    this.carroService
      .createCars(this.nuevoModelo, this.nuevaMarca, this.nuevaSerie)
      .subscribe(() => {
        // limpia los campos después de crear
        this.nuevoModelo = 0;
        this.nuevaMarca = '';
        this.nuevaSerie = '';
      });
  }
}

