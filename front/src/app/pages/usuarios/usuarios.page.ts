import { Component } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [IonicModule, NgFor, NgIf, FormsModule, AsyncPipe, RouterLink, IonButton],
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage {
  nuevoNombre = '';
  nuevoCorreo = '';

  constructor(private userService: UserService) {
  }

  crearUsuario() {
    if (!this.nuevoNombre || !this.nuevoCorreo) return;

    this.userService
      .createUser(this.nuevoNombre, this.nuevoCorreo)
      .subscribe((nuevo) => {
        this.nuevoNombre = '';
        this.nuevoCorreo = '';
      });
  }
}
