import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IonInput, IonItem, IonList, IonContent, IonButton  } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PeliculasService } from '../services/peliculas.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.page.html',
  styleUrls: ['./peliculas.page.scss'],
  standalone: true,
  imports: [IonicModule, NgFor, AsyncPipe, RouterModule, IonInput, IonItem, IonList, IonContent , IonButton ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PeliculasPage implements OnInit {

  nombre: string = '';
  anio: number | null = null;;
  director: string = '';

  constructor(
    private peliculasService: PeliculasService,
    //private router: Router
  ) {}

  ngOnInit(): void {
    

  }

  crearPelicula() {
    if (this.nombre && this.anio && this.director) {
      this.peliculasService
        .crearPelicula(this.nombre, this.anio, this.director)
        .subscribe({
          next: () => {
            alert('Película creada exitosamente');
            //this.router.navigate(['/lista-peliculas']); // volver al listado
          },
          error: (err) => {
            console.error('Error al crear película:', err);
            alert('Error al crear película');
          }
        });
    } else {
      alert('Por favor, completa todos los campos');
    }
  }
}
