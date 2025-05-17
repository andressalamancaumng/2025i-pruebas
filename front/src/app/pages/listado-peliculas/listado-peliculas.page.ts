import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.page.html',
  styleUrls: ['./listado-peliculas.page.scss'],
  standalone: true,
  imports: [IonicModule, NgFor, AsyncPipe, RouterModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListadoUsuariosPage implements OnInit, AfterViewInit, OnDestroy {
  peliculas: any[] = [];
  filtro_Pelicula: any[] = [];
  searchTerm: string = '';

  imagenes = [
    'assets/imagen1.jpg',
    'assets/imagen2.jpg',
    'assets/imagen3.jpg',
    'assets/imagen4.jpg',
    'assets/imagen5.jpg',
    'assets/imagen6.jpg',
    'assets/imagen7.jpg',
    'assets/imagen8.jpg',
    'assets/imagen9.jpg',
    'assets/imagen10.jpg',
    'assets/imagen11.jpg',
    'assets/imagen12.jpg',
    'assets/imagen13.jpg',
    'assets/imagen14.jpg',
    'assets/imagen15.jpg',
    'assets/imagen16.jpg',
    'assets/imagen17.jpg',
    'assets/imagen18.jpg',
    'assets/imagen19.jpg',
    'assets/imagen20.jpg'

  ];

  @ViewChild('carrusel', { static: false }) carruselRef!: ElementRef<HTMLDivElement>;
  scrollInterval: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadMovies();
  }

  ngAfterViewInit() {
    setTimeout(() => this.startAutoScroll(), 500);
  }

  ngOnDestroy() {
    this.pausarScroll();
  }

  loadMovies() {
    this.userService.getMovies().subscribe((data) => {
      this.peliculas = data;
      this.filtro_Pelicula = data;
    });
  }

  startAutoScroll() {
    const carrusel = this.carruselRef?.nativeElement;
    if (!carrusel) {
      console.error('Carrusel no encontrado');
      return;
    }

    const velocidad = 2;
    this.scrollInterval = setInterval(() => {
      carrusel.scrollLeft += velocidad;
      if (carrusel.scrollLeft >= (carrusel.scrollWidth - carrusel.clientWidth)) {
        carrusel.scrollLeft = 0;
      }
    }, 20);
  }

  pausarScroll() {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
      this.scrollInterval = null;
    }
  }

  filter() {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      this.filtro_Pelicula = this.peliculas;
      return;
    }

    this.filtro_Pelicula = this.peliculas.filter((pelicula) => {
      const nombre = pelicula.name?.toLowerCase() || '';
      const director = pelicula.name_director?.toLowerCase() || '';
      const year = String(pelicula.year || '');
      const id = String(pelicula.id || '');

      return (
        nombre.includes(term) ||
        director.includes(term) ||
        year.includes(term) ||
        id === term
      );
    });
  }

  limpiarBusqueda() {
    this.searchTerm = '';
    this.filtro_Pelicula = this.peliculas;
  }

  delete(id: number) {
    this.userService.delete(id).subscribe(
      () => {
        this.peliculas = this.peliculas.filter((pelicula) => pelicula.id !== id);
        this.filtro_Pelicula = this.peliculas;
        alert('Película eliminada con éxito');
      },
      (error) => {
        console.error('Error al eliminar la película', error);
        alert('No es posible eliminar la película');
      }
    );
  }
}

