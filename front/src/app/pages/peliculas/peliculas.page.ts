import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [IonicModule, NgFor, NgIf, FormsModule, AsyncPipe, RouterLink],
  templateUrl: './peliculas.page.html',
  styleUrls: ['./peliculas.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsuariosPage implements AfterViewInit, OnDestroy {
  nuevaPelicula = '';
  nuevoAno: number | null = null;
  nuevoNombre_director = '';
  movies: any[] = [];

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
    'assets/imagen20.jpg',
  ];

  @ViewChild('carrusel', { static: false }) carruselRef!: ElementRef<HTMLDivElement>;
  scrollInterval: any;

  constructor(private userService: UserService) {}

  ngAfterViewInit() {
    setTimeout(() => this.startAutoScroll(), 500); // Espera a que se rendericen las imágenes
  }

  ngOnDestroy() {
    this.pausarScroll();
  }

startAutoScroll() {
  const carrusel = this.carruselRef.nativeElement;
  const velocidad = 1; // velocidad suave

  this.scrollInterval = setInterval(() => {
    if (!carrusel) return;

    carrusel.scrollLeft += velocidad;

    // Reiniciar scroll si llega al final
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

  ionViewWillEnter() {
    this.loadMovies();
  }

  loadMovies() {
    this.userService.getMovies().subscribe((data: any) => {
      this.movies = data;
    });
  }

  crearPelicula() {
    if (!this.nuevaPelicula || this.nuevoAno == null || !this.nuevoNombre_director) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    this.userService
      .createMovie(this.nuevoNombre_director, Number(this.nuevoAno), this.nuevaPelicula)
      .subscribe(() => {
        this.nuevoNombre_director = '';
        this.nuevaPelicula = '';
        this.nuevoAno = null;
        this.loadMovies();
        alert('Película creada con éxito');
      });
  }
}
