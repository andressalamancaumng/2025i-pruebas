import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class UsuariosPage {
  usuarios: User[] = [];

  nuevoNombre = '';
  nuevoCorreo = '';
  nuevoDocumento = '';

  constructor(private userService: UserService) {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.userService.getUsers().subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => console.error('Error al cargar usuarios', err)
    });
  }

  crearUsuario() {
    if (!this.nuevoNombre || !this.nuevoCorreo || !this.nuevoDocumento) {
      alert('Por favor llena todos los campos.');
      return;
    }

    this.userService.createUser(this.nuevoNombre, this.nuevoCorreo, this.nuevoDocumento)
      .subscribe({
        next: (usuarioCreado) => {
          alert('Usuario creado correctamente');
          this.nuevoNombre = '';
          this.nuevoCorreo = '';
          this.nuevoDocumento = '';
          this.cargarUsuarios();
        },
        error: (err) => {
          console.error('Error al crear usuario', err);
          alert('Error al crear usuario');
        }
      });
  }

  eliminarUsuario(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: () => this.cargarUsuarios(),
      error: (err) => console.error('Error al eliminar usuario', err)
    });
  }
}
