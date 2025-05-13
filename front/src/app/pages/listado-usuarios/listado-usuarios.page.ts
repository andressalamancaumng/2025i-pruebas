// Importaciones necesarias desde Angular e Ionic
import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CarroService } from '../../services/carro.service';
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
  modelo: number | null = null; // Modelo del carro (año)
  marca: string = '';           // Marca del carro
  serie: string = '';           // Serie del carro
  mensajeCreacion: string = ''; // Mensaje de confirmación tras creación exitosa

  // Inyección del servicio que gestiona los carros
  constructor(private carroService: CarroService) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {}

  // Función que se ejecuta al enviar el formulario
  crearCarro() {
    // Validación: todos los campos deben estar completos
    if (this.modelo && this.marca.trim() && this.serie.trim()) {
      // Llama al servicio para crear un carro
      this.carroService.createCarro({ modelo: this.modelo, marca: this.marca.trim(), serie: this.serie.trim() }).subscribe(() => {
        // Si se crea correctamente, se muestra mensaje y se limpian los campos
        this.mensajeCreacion = 'Carro exitosamente creado';
        this.modelo = null;
        this.marca = '';
        this.serie = '';
      }, (error) => {
        // Manejo de error si la creación falla
        console.error('Error al crear carro:', error);
        alert('Error al crear carro: ' + error.message);
      });
    } else {
      // Alerta si algún campo está vacío
      alert('Por favor, complete todos los campos antes de crear un carro.');
    }
  }

  // Método para cancelar la creación del carro (resetea campos)
  cancelar() {
    this.modelo = null;
    this.marca = '';
    this.serie = '';
    this.mensajeCreacion = '';
  }
}
