// Importaciones necesarias desde Angular e Ionic
import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PeliculaService } from '../../services/pelicula.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Decorador que define los metadatos del componente
@Component({
  selector: 'app-listado-usuarios', // Selector del componente para su uso en HTML
  templateUrl: './listado-usuarios.page.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./listado-usuarios.page.scss'], // Estilos CSS/SCSS del componente
  standalone: true, // Componente independiente (sin necesidad de módulo padre)
  imports: [IonicModule, NgFor, AsyncPipe, NgIf, RouterModule, FormsModule], // Módulos y directivas usadas
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Permite usar elementos personalizados en la plantilla
})
export class ListadoUsuariosPage implements OnInit {
  // Propiedades del formulario
  nombrepelicula: string = '';   // Modelo del carro (año)
  director: string = '';           // Marca del carro
  anio: number = 2000;          // Serie del carro
  mensajeCreacion: string = ''; // Mensaje de confirmación tras creación exitosa

  // Inyección del servicio que gestiona los carros
  constructor(private peliculaService: PeliculaService) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {}

  // Función que se ejecuta al enviar el formulario
  crearPelicula() {
    // Validación: todos los campos deben estar completos
    if (this.nombrepelicula && this.director.trim() && this.anio) {
      // Llama al servicio para crear un carro
      this.peliculaService.createPelicula({ nombrepelicula: this.nombrepelicula, director: this.director.trim(), anio: this.anio }).subscribe(() => {
        // Si se crea correctamente, se muestra mensaje y se limpian los campos
        this.mensajeCreacion = 'Pelicula exitosamente creado';
        this.nombrepelicula = '';
        this.director = '';
        this.anio = 2000;
      }, (error) => {
        // Manejo de error si la creación falla
        console.error('Error al crear pelicula:', error);
        alert('Error al crear pelicula: ' + error.message);
      });
    } else {
      // Alerta si algún campo está vacío
      alert('Por favor, complete todos los campos antes de crear una pelicula.');
    }
  }

  // Método para cancelar la creación del carro (resetea campos)
  cancelar() {
    this.nombrepelicula = '';
    this.director = '';
    this.anio = 2000;
    this.mensajeCreacion = '';
  }
}
