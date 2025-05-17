usuario.page.ts:

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
  nuevoCorreo = '';
  nuevoDocumento = '';

  constructor(private userService: UserService) {
  }

  crearUsuario() {
    if (!this.nuevoNombre || !this.nuevoCorreo||!this.nuevoDocumento) return;

    this.userService
      .createUser(this.nuevoNombre, this.nuevoCorreo,this.nuevoDocumento)
      .subscribe((nuevo) => {
        this.nuevoNombre = '';
        this.nuevoCorreo = '';
        this.nuevoDocumento = '';
      });
  }
}