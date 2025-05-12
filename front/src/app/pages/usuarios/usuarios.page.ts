import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { CarroService } from '../../services/carro.service';


@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [IonicModule, NgFor, NgIf, FormsModule, AsyncPipe, RouterLink],
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class VehiculosPage implements OnInit {
  nuevoModelo: number | null = null;
  nuevaMarca: string = '';
  nuevaSerie: string = '';
  carros: any[] = [];

  constructor(private carroService: CarroService) {}

  ngOnInit() {
    this.cargarCarros();
  }

  cargarCarros() {
    this.carroService.getCarros().subscribe((data) => {
      this.carros = data;
    });
  }

  crearVehiculo(event: Event) {
    event.preventDefault();
    if (!this.nuevoModelo || !this.nuevaMarca || !this.nuevaSerie) return;

    this.carroService
      .createCarro({
        modelo: this.nuevoModelo,
        marca: this.nuevaMarca,
        serie: this.nuevaSerie,
      })
      .subscribe(() => {
        this.nuevoModelo = null;
        this.nuevaMarca = '';
        this.nuevaSerie = '';
        this.cargarCarros(); // Recargar la lista después de crear
      });
  }
}
