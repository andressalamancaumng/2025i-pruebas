import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.page.html',
  styleUrls: ['./listado-usuarios.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class ListadoUsuariosPage {
  nombre = '';
  email = '';
  documento = '';

  constructor(private userService: UserService) {}

  registrarUsuario() {
    if (this.nombre && this.email && this.documento) {
      this.userService.createUser(this.nombre, this.email, this.documento).subscribe({
        next: res => {
          alert('Usuario creado correctamente');
          this.nombre = '';
          this.email = '';
          this.documento = '';
        },
        error: err => alert('Error al crear usuario'),
      });
    } else {
      alert('Completa todos los campos');
    }
  }
}