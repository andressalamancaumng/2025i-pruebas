import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
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
  imports: [IonicModule, NgFor, AsyncPipe, RouterModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListadoUsuariosPage implements OnInit {
  carros: any[] = [];
  modelo: number | null = null;
  marca: string = '';

  constructor(private carroService: CarroService) {
    this.loadCarros();
  }

  ngOnInit() {}

  loadCarros() {
    this.carroService.getCarros().subscribe((data) => {
      this.carros = data;
    });
  }

  crearCarro() {
    if (this.modelo && this.marca.trim()) {
      this.carroService.createCarro({ modelo: this.modelo, marca: this.marca.trim(), serie: this.serie.trim() }).subscribe(() => {
        this.modelo = null;
        this.marca = '';
        this.loadCarros();
      });
    }
  }
}
