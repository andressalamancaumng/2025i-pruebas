import { Component } from '@angular/core';
import { CommonModule, AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CarService } from '../../services/car.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carros',
  standalone: true, // Esto es importante para componentes independientes
  imports: [IonicModule,
    NgFor,
    NgIf,
    FormsModule,
    AsyncPipe,
    RouterLink,
    CommonModule,],
  templateUrl: './carros.page.html',
  styleUrls: ['./carros.page.scss'],
})
export class CarrosPage {
  marca = '';
  modelo: number | null = null;
  serie = '';
  carros: any[] = [];
  constructor(
    private carService: CarService
  ) { }
  ngOnInit() {

    this.loadCars();

  }
  loadCars() {
    this.carService.getCarros().subscribe((data: any) => {
      this.carros = data;
    });
  }
  ionViewWillEnter() {
    this.loadCars();
  }
  crearCarro() {

    if (!this.marca || this.modelo == null || !this.serie) {
      alert('Por favor, complete todos los campos.');
      return;

    }

    this.carService
      .createCarro(this.marca, Number(this.modelo), this.serie)
      .subscribe(() => {
        this.marca = '';
        this.serie = '';
        this.modelo = null;
        this.loadCars();
        alert('Carro agregado con éxito');
      });


  }
}
