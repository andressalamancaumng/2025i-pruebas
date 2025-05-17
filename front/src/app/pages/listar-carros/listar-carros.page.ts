import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  IonicModule,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonHeader,
  IonContent,
  IonText
} from '@ionic/angular';

import { CarroService } from 'src/app/services/carro.service';

@Component({
  selector: 'app-listar-carros',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    NgIf,
    NgFor,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonHeader,
    IonContent,
    IonText
  ],
  templateUrl: './listar-carros.page.html',
  styleUrls: ['./listar-carros.page.scss'],
})
export class ListarCarrosPage implements OnInit {
  carros: any[] = [];
  mensaje = '';

  constructor(private carroService: CarroService) {}

  ngOnInit() {
    this.cargarCarros();
  }

  cargarCarros() {
    this.carroService.obtenerCarros().subscribe({
      next: (data) => {
        this.carros = data;
      },
      error: () => {
        this.mensaje = 'Error al cargar los carros';
      }
    });
  }

  eliminarCarro(id: number) {
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





