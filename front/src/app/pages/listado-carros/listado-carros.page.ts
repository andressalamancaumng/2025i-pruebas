import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton } from '@ionic/angular/standalone';
import { CarService } from '../../services/carros.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listado-carros',
  templateUrl: './listado-carros.page.html',
  styleUrls: ['./listado-carros.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    CommonModule,
    RouterModule,
  ]
})
export class ListadoCarrosPage implements OnInit {
  carros: any[] = [];

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.loadCarros();
  }

  // Carga los carros desde el servicio
  loadCarros() {
    this.carService.getCars().subscribe(data => {
      this.carros = data;
    });
  }

  // Borra un carro y recarga la lista
  deleteCarro(id: number) {
    this.carService.deleteCarro(id).subscribe(() => {
      this.loadCarros();
    });
  }
}
