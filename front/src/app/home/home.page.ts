import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard,
  IonCardHeader, IonCardTitle, IonCardContent, IonItem,
  IonLabel, IonInput, IonButton, IonList, IonListHeader,
  IonIcon, IonText
} from '@ionic/angular/standalone';

import { FormsModule } from '@angular/forms';
import { CarroService } from '../services/carro.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonCard,
    IonCardHeader, IonCardTitle, IonCardContent, IonItem,
    IonLabel, IonInput, IonButton, IonList, IonListHeader,
    IonIcon, IonText
  ]
})

export class HomePage {
  carros: any[] = [];
  nuevoCarro = {
    modelo: null,
    marca: '',
    serie: ''
  };

  constructor(private carroService: CarroService, private cd: ChangeDetectorRef) {
    this.obtenerCarros();
  }


  obtenerCarros() {
    this.carroService.getCarros().subscribe(data => {
      this.carros = data;
    });
  }

  agregarCarro() {
  const { modelo, marca, serie } = this.nuevoCarro;

  if (modelo && marca && serie) {
    this.carroService.crearCarro(this.nuevoCarro).subscribe(() => {
      this.nuevoCarro = { modelo: null, marca: '', serie: '' };
      this.obtenerCarros();
    });
  }
}

  eliminarCarro(id: number) {
    this.carroService.eliminarCarro(id).subscribe(() => {
      this.obtenerCarros();
    });
  }
}
