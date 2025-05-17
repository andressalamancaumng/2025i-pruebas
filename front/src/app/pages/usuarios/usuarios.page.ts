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
  nuevoID = '';
  anioLanz = '';
  nuevoDirector = '';


  constructor(private userService: UserService) {
  }

  crearPelicula() {
    if (!this.nuevoNombre || !this.nuevoID || !this.anioLanz || !this.nuevoDirector) return;

    this.userService
      .crearPelis(this.nuevoNombre, this.nuevoID, this.anioLanz, this.nuevoDirector)
      .subscribe((nuevo) => {
        this.nuevoNombre = '';
        this.nuevoID = '';
        this.anioLanz = '';
        this.nuevoDirector = '';
      });
  }
}
