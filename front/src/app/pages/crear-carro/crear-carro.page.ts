import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CarroService, Carro } from 'src/app/services/carro.service';

@Component({
  selector: 'app-crear-carro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonicModule
  ],
  templateUrl: './crear-carro.page.html',
  styleUrls: ['./crear-carro.page.scss'],
})
export class CrearCarroPage {
  carro: Carro = {
    modelo: '',
    marca: '',
    serie: ''
  };
  mensaje = '';

  constructor(private carroService: CarroService, private router: Router) {}

  crear() {
    if (!this.carro.modelo || !this.carro.marca || !this.carro.serie) {
      this.mensaje = 'Todos los campos son obligatorios';
      return;
    }

    this.carroService.crearCarro(this.carro).subscribe({
      next: () => {
        this.mensaje = 'Carro creado correctamente 🚗';
        this.router.navigate(['/listar-carros']);
      },
      error: (err) => {
        this.mensaje = err.error?.detail || 'Error al crear el carro';
      }
    });
  }
}






