// Importación de componentes y funcionalidades necesarias de Angular y otros módulos
import { Component, OnInit } from '@angular/core'; // Para crear componentes y usar el ciclo de vida OnInit
import { AsyncPipe, NgFor, NgIf } from '@angular/common'; // Pipes y directivas estructurales para el template
import { FormsModule } from '@angular/forms'; // Para manejar formularios (si se agregan en el futuro)
import { IonicModule } from '@ionic/angular'; // Componentes y funcionalidades de Ionic
import { RouterLink } from '@angular/router'; // Para habilitar navegación con [routerLink]
import { PeliculaService } from '../../services/pelicula.service'; // Servicio que gestiona las peticiones al backend

// Decorador del componente que define su configuración
@Component({
  selector: 'app-peliculas', // Selector que identifica este componente en el HTML
  standalone: true, // Permite que el componente sea usado sin necesidad de declararlo en un módulo
  imports: [        // Lista de módulos necesarios para que el template funcione correctamente
    IonicModule,    // Incluye componentes visuales de Ionic
    NgFor,          // Permite usar *ngFor para iterar sobre listas
    NgIf,           // Permite usar *ngIf para condicionales en el HTML
    FormsModule,    // Manejo de formularios
    //AsyncPipe,      // Pipe para manejar Observables directamente en el HTML (no usado aquí directamente)
    //RouterLink      // Permite el uso de navegación con routerLink en las plantillas (pero tampoco lo usamos aqui)
  ],
  templateUrl: './usuarios.page.html', // Ruta al archivo HTML que define la vista
  styleUrls: ['./usuarios.page.scss'], // Estilos específicos para este componente
})

// Clase del componente que implementa la lógica de la vista
export class PeliculasPage implements OnInit {
  // ✅ Lista que almacenará las películas obtenidas del backend
  peliculas: any[] = [];

  // ✅ Inyección del servicio de películas para usarlo en los métodos del componente
  constructor(private peliculaService: PeliculaService) {}

  // ✅ Método que se ejecuta automáticamente cuando se inicializa el componente
  ngOnInit() {
    this.cargarPeliculas(); // Carga las películas al entrar a la página
  }

  // ✅ Método que llama al servicio para obtener la lista de películas desde el backend
  cargarPeliculas() {
    this.peliculaService.getPeliculas().subscribe((data) => {
      this.peliculas = data; // Asigna las películas obtenidas a la propiedad local
    });
  }
}
