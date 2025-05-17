import { Component } from '@angular/core';
import { NgFor, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { PeliculaService } from '../../services/peliculas.service'; 
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-listado-peliculas',
  standalone: true,
  imports: [ IonicModule,  NgFor, NgIf, FormsModule, RouterLink],
  templateUrl: './listado-peliculas.page.html',
  styleUrls: ['./listado-peliculas.page.scss'],
})

export class ListadoPeliculasPage implements ViewWillEnter {
  peliculas: any[] = [];
  PeliculasFiltradas: any[] = [];
  searchTerm: string = '';


  constructor(private peliculaService: PeliculaService) {}

  ionViewWillEnter(): void {
    this.leerPeliculas();
  }

leerPeliculas() {
  this.peliculaService.obtenerPeliculas().subscribe( data => {
    this.peliculas = data;
    this.applyFilter();
  });
}

applyFilter() {
  const term = this.searchTerm.trim().toLowerCase();
  this.PeliculasFiltradas = this.peliculas.filter(pelicula =>
    pelicula.titulo.toLowerCase().includes(term)
  );
}

borrarPelicula(id: number) {
  this.peliculaService.borarPelicula(id).subscribe(() => {
    this.leerPeliculas();
  });

}


}

