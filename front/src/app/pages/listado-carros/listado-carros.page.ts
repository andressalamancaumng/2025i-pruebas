import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-listado-carros',
  templateUrl: './listado-carros.page.html',
  styleUrls: ['./listado-carros.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, AsyncPipe, NgFor, NgIf]
})
export class ListadoCarrosPage {
  filtro_carro: any[] = [];
  searchterm: string = "";
  carros: any[] = [];

  constructor(private carService: CarService) { }
  ngOnInit() {
    this.loadCars();
  }
  loadCars() {
    this.carService.getCarros().subscribe((data) => {
      this.carros = data;
      this.filtro_carro = data; // Inicialmente, todas las películas están visibles
    });
  }
  filter() {
    const term = this.searchterm.trim().toLocaleLowerCase();

    if (!isNaN(Number(term))) {
      this.filtro_carro = this.carros.filter((carros) => carros.id === Number(term));
    }
    else {
      this.filtro_carro = this.carros.filter((carros) => carros.name.toLocaleLowerCase().includes(term));
    }
  }
  eliminarCarro(id: number) {
    // Implementa la lógica para eliminar
    this.carService.delete(id).subscribe(
      () => {
        this.carros = this.carros.filter((carros) => carros.id !== id);
        this.filtro_carro = this.carros;
        alert("Carro eliminado con éxito");
      },
      (error) => {
        console.error("Error al eliminar el carro", error);
        alert("No es posible eliminar el carro");
      }
    )
  }
}