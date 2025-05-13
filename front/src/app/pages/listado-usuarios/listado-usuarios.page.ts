import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CarroService } from '../../services/carro.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.page.html',
  styleUrls: ['./listado-usuarios.page.scss'],
  standalone: true,
  imports: [IonicModule, NgFor, AsyncPipe, NgIf, RouterModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListadoUsuariosPage implements OnInit {
  modelo: number | null = null;
  marca: string = '';
  serie: string = '';
  mensajeCreacion: string = '';

  constructor(private carroService: CarroService) {}

  ngOnInit() {}

  crearCarro() {
    if (this.modelo && this.marca.trim() && this.serie.trim()) {
      this.carroService.createCarro({ modelo: this.modelo, marca: this.marca.trim(), serie: this.serie.trim() }).subscribe(() => {
        this.mensajeCreacion = 'Carro exitosamente creado';
        this.modelo = null;
        this.marca = '';
        this.serie = '';
      }, (error) => {
        console.error('Error al crear carro:', error);
        alert('Error al crear carro: ' + error.message);
      });
    } else {
      alert('Por favor, complete todos los campos antes de crear un carro.');
    }
  }

  cancelar() {
    this.modelo = null;
    this.marca = '';
    this.serie = '';
    this.mensajeCreacion = '';
  }
}
