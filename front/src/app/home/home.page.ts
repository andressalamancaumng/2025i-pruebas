import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard,
  IonCardHeader, IonCardTitle, IonCardContent, IonItem,
  IonLabel, IonInput, IonButton, IonList, IonListHeader,
  IonIcon, IonText, IonButtons, IonCardSubtitle, IonFooter
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
    IonIcon, IonText, IonButtons, IonCardSubtitle, IonFooter
  ]
})

export class HomePage {
  today = new Date().toLocaleDateString();
  isDarkMode = false;
  carros: any[] = [];
  nuevoCarro = {
    modelo: null,
    marca: '',
    serie: ''
  };
  mensaje = '';

  constructor(private carroService: CarroService, private cd: ChangeDetectorRef, private platform: Platform) {
    platform.ready().then(() => {
    this.toggleDarkTheme(); // Puedes mantener esto aquí si quieres el modo oscuro desde el inicio
    this.obtenerCarros();
    });
  }
  get iconMode(): string {
    return this.isDarkMode ? 'assets/sun-pixel.png' : 'assets/moon-pixel.png';
  }

  toggleDarkTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark', this.isDarkMode);
  }
  camposCompletos(): boolean {
  const { marca, modelo, serie } = this.nuevoCarro;
  return (
    marca.trim() !== '' &&
    modelo !== null &&
    serie.trim() !== ''
  );
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
      this.mensaje = '✅ Carro agregado exitosamente';
      setTimeout(() => this.mensaje = '', 2000);
    });
  }
}

  eliminarCarro(id: number) {
    this.carroService.eliminarCarro(id).subscribe(() => {
      this.obtenerCarros();
    });
  }
}
