// listado-peliculas.page.ts
import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PeliculasService,Pelicula } from '../../services/peliculas.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ListadoPeliculasPage',
  templateUrl: './listado-peliculas.page.html',
  styleUrls: ['./listado-peliculas.page.scss'],
  standalone: true,
  imports: [IonicModule, NgFor, AsyncPipe, RouterModule,CommonModule,IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListadoPeliculasPage implements OnInit {
  peliculas: Pelicula[] = [];  // Ahora usamos la clase Pelicula correctamente

  constructor(private peliculasService: PeliculasService) {}
ngOnInit(){
  this.obtenerpeliculas();
}
  obtenerpeliculas() {
    this.peliculasService.obtenerPeliculas().subscribe(data => {
      this.peliculas = data;
      console.log('peliculas recibidas',data);
    },
    error =>{console.error('Error al obtener peliculas',error);

    }
  );
  }
 borrarPelicula(id: number) {
  this.peliculasService.borrarPelicula(id).subscribe(
    () => {
      this.peliculas = this.peliculas.filter(pelicula => pelicula.id !== id);
    },
    (error) => {
      console.error('Error al borrar película', error);
    }
  );
}

}