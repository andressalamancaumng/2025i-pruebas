import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';  // Importa RouterModule
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { CarService } from '../../services/carros.service';

@Component({
  selector: 'app-carros',
  templateUrl: './carros.page.html',
  styleUrls: ['./carros.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    CommonModule,
    FormsModule,
    RouterModule 
  ]
})
export class CarrosPage implements OnInit {
  carros: any[] = [];
  newCarro = {
    modelo: 0,
    marca: '',
    serie: ''
  };

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.getCarros();
  }

  getCarros() {
    this.carService.getCars().subscribe(data => {
      this.carros = data;
    });
  }

  createCarro() {
    const { modelo, marca, serie } = this.newCarro;
    if (!modelo || !marca || !serie) {
      alert('Por favor completa todos los campos');
      return;
    }

    this.carService.createCarro(modelo, marca, serie).subscribe(() => {
      this.getCarros();
      this.newCarro = { modelo: 0, marca: '', serie: '' };
    });
  }

  deleteCarro(id: number) {
    this.carService.deleteCarro(id).subscribe(() => {
      this.getCarros();
    });
  }
}
