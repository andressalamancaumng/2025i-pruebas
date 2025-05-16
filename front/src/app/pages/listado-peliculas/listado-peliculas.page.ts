// listado-peliculas.page.ts
import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PeliculasService,Pelicula } from '../../services/peliculas.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-ListadoPeliculasPage',
  templateUrl: './listado-peliculas.page.html',
  styleUrls: ['./listado-peliculas.page.scss'],
  standalone: true,
  imports: [IonicModule, NgFor, AsyncPipe, FormsModule,RouterModule,CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListadoPeliculasPage implements OnInit {
  peliculas: Pelicula[] = []; 
  idBuscado!: number;
peliculaEncontrada: Pelicula | null = null;
errorBusqueda: string = '';
idABorrar!: number;
mensajeBorrar: string = '';
errorBorrar: string = '';

  constructor(private peliculasService: PeliculasService, private router:Router) {}
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

 borrarPorId() {
  this.mensajeBorrar = '';
  this.errorBorrar = '';

  if (!this.idABorrar || this.idABorrar <= 0) {
    this.errorBorrar = 'Por favor ingresa un ID válido para borrar.';
    return;
  }

  this.peliculasService.borrarPelicula(this.idABorrar).subscribe(
    () => {
      this.mensajeBorrar = `Película con ID ${this.idABorrar} borrada correctamente.`;
      this.peliculas = this.peliculas.filter(p => p.id !== this.idABorrar); // actualizar listado
      this.peliculaEncontrada = null;
      this.idABorrar = 0; 
    },
    (error) => {
      console.error('Error al borrar película', error);
      this.errorBorrar = 'No se pudo borrar. Verifica el ID.';
    }
  );
}


volver(){
  this.router.navigate(['/peliculas']);
}
buscarPeliculaPorId() {
  this.peliculaEncontrada = null;
  this.errorBusqueda = '';

  if (!this.idBuscado || this.idBuscado <= 0) {
    this.errorBusqueda = 'Por favor ingresa un ID válido.';
    return;
  }

  this.peliculasService.obtenerPeliculaPorId(this.idBuscado).subscribe(
    (pelicula) => {
      this.peliculaEncontrada = pelicula;
    },
    (error) => {
      console.error('Error al buscar película', error);
      this.errorBusqueda = 'Película no encontrada.';
    }
  );
}


}