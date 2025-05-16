import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonText,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.page.html',
  styleUrls: ['./listado-usuarios.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,      // Necesario para [(ngModel)]
    IonText,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
  ],
})
export class ListadoUsuariosPage implements OnInit {
  usuarios: any[] = [];

  // Propiedades para crear usuario
  nuevoNombre: string = '';
  nuevoCorreo: string = '';
  nuevoDocumento: string = '';

  // Propiedad para búsqueda
  busqueda: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.userService.getUsers().subscribe((data) => {
      this.usuarios = data;
    });
  }

  crearUsuario() {
    if (
      this.nuevoNombre.trim() &&
      this.nuevoCorreo.trim() &&
      this.nuevoDocumento.trim()
    ) {
      this.userService
        .createUser(this.nuevoNombre, this.nuevoCorreo, this.nuevoDocumento)
        .subscribe(() => {
          this.nuevoNombre = '';
          this.nuevoCorreo = '';
          this.nuevoDocumento = '';
          this.cargarUsuarios();
        });
    }
  }

  eliminarUsuario(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.usuarios = this.usuarios.filter(u => u.id !== id);
    });
  }

  buscarUsuario() {
    if (this.busqueda.trim() === '') {
      this.cargarUsuarios();
      return;
    }

    this.userService.searchUsers(this.busqueda).subscribe(
      (usuario) => {
        this.usuarios = Array.isArray(usuario) ? usuario : [usuario];
      },
      (error) => {
        this.usuarios = [];
        console.error('Usuario no encontrado');
      }
    );
  }
}
