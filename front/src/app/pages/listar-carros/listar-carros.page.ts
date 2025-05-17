import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CarroService } from 'src/app/services/carro.service';

interface Carro {
  id?: number; // ← id puede ser opcional
  modelo: string;
  marca: string;
  serie: string;
}

@Component({
  selector: 'app-listar-carros',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    NgIf,
    NgFor,
  ],
  templateUrl: './listar-carros.page.html',
  styleUrls: ['./listar-carros.page.scss'],
})
export class ListarCarrosPage implements OnInit {
  carros: Carro[] = [];
  mensaje = '';

  constructor(private carroService: CarroService) {}

  ngOnInit() {
    this.cargarCarros();
  }

  cargarCarros() {
    this.carroService.obtenerCarros().subscribe({
      next: (data: Carro[]) => {
        this.carros = data;
      },
      error: () => {
        this.mensaje = 'Error al cargar los carros';
      }
    });
  }

  eliminarCarro(id: number) {
    if (id === undefined) return; // Protección adicional
    this.carroService.eliminarCarro(id).subscribe({
      next: () => {
        this.mensaje = 'Carro eliminado correctamente';
        this.cargarCarros();
      },
      error: () => {
        this.mensaje = 'Error al eliminar el carro';
      }
    });
  }
}













