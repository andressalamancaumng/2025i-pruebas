import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../services/carro.service';

@Component({
  selector: 'app-listado-carros',
  templateUrl: './listado-carros.page.html',
  styleUrls: ['./listado-carros.page.scss'],
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
    this.carroService.getCarros().subscribe(data => {
      this.carros = data;
    });
  }

  crearCarro() {
    this.carroService.createCars(this.nuevoModelo, this.nuevaMarca, this.nuevaSerie)
      .subscribe(() => {
        this.nuevoModelo = 0;
        this.nuevaMarca = '';
        this.nuevaSerie = '';
        this.cargarCarros(); // recarga la lista para mostrar el nuevo carro
      });
  }
}



