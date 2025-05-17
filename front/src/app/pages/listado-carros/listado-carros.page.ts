import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CarsService } from '../../services/carro.service';

@Component({
  selector: 'app-listado-carros',
  templateUrl: './listado-carros.page.html',
  styleUrls: ['./listado-carros.page.scss'],
  standalone: true,
  imports: [IonicModule, NgFor, AsyncPipe, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListadoCarrosPage implements OnInit {
  carros: any[] = [];

  nuevoModelo: number = 0;
  nuevaMarca: string = '';
  nuevaSerie: string = '';

  constructor(private carroService: CarsService) {}

  ngOnInit() {
    this.cargarCarros();
  }

  cargarCarros() {
    this.carroService.getCarros().subscribe({
      next: (data) => {
        console.log('Carros recibidos:', data);
        this.carros = data;
      },
      error: (err) => {
        console.error('Error al obtener carros', err);
      }
    });
  }

  crearCarro() {
    if (!this.nuevoModelo || !this.nuevaMarca || !this.nuevaSerie) return;

    this.carroService.createCars(this.nuevoModelo, this.nuevaMarca, this.nuevaSerie)
      .subscribe(() => {
        this.nuevoModelo = 0;
        this.nuevaMarca = '';
        this.nuevaSerie = '';
        this.cargarCarros();  // recarga la lista
      });
  }
}
