import { Component } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [IonicModule, NgFor, NgIf, FormsModule, AsyncPipe, RouterLink],
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage {
  nuevoNombre = '';
  anioLanz = null;
  nuevoDirector = '';


  constructor(private userService: UserService) {
  }

  crearPelicula() {
    if (!this.nuevoNombre || !this.anioLanz || !this.nuevoDirector) return;

    const cPeli = {
      titulo: this.nuevoNombre,
      ID: 0,
      anio: this.anioLanz,
      director: this.nuevoDirector

    };

    this.userService
      .crearPelis(cPeli)
      .subscribe((nuevo) => {
        alert("Película creada exitosamente")
        this.nuevoNombre = '';
        this.anioLanz = null;
        this.nuevoDirector = '';
      });
  }
}
