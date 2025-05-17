import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular';
import { UserService, User } from '../../services/user.service';  // Importa User junto con UserService

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.page.html',
  styleUrls: ['./listado-usuarios.page.scss'],
  standalone: true,
  imports: [IonicModule, IonHeader, IonToolbar, IonTitle, IonContent]
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
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.usuarios = data;
      },
      (err) => {
        console.error('Error al cargar usuarios', err);
      }
    );
  }

  crearUsuario() {
    if (!this.nuevoNombre || !this.nuevoCorreo || !this.nuevoDocumento) {
      alert('Por favor llena todos los campos.');
      return;
    }

    this.userService.createUser(this.nuevoNombre, this.nuevoCorreo, this.nuevoDocumento)
      .subscribe({
        next: () => {
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
