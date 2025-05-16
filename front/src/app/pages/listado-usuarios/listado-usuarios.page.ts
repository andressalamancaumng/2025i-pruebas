<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { Component } from '@angular/core';
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
>>>>>>> 0588082311a5b810d900046bcb4052ee7d9b75de
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.page.html',
<<<<<<< HEAD
=======
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
>>>>>>> 0588082311a5b810d900046bcb4052ee7d9b75de
})
export class ListadoUsuariosPage implements OnInit {
  usuarios: any[] = [];
<<<<<<< HEAD
  nombreNuevo = '';
  correoNuevo = '';
=======

  // Propiedades para crear usuario
  nuevoNombre: string = '';
  nuevoCorreo: string = '';
  nuevoDocumento: string = '';

  // Propiedad para búsqueda
  busqueda: string = '';
>>>>>>> 0588082311a5b810d900046bcb4052ee7d9b75de

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
<<<<<<< HEAD
    if (!this.nombreNuevo || !this.correoNuevo) return;
    this.userService.createUser(this.nombreNuevo, this.correoNuevo).subscribe(() => {
      this.nombreNuevo = '';
      this.correoNuevo = '';
=======
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
>>>>>>> 0588082311a5b810d900046bcb4052ee7d9b75de
      this.cargarUsuarios();
    });
  }

<<<<<<< HEAD
  eliminarUsuario(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.usuarios = this.usuarios.filter(u => u.id !== id);
    });
=======
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
>>>>>>> 0588082311a5b810d900046bcb4052ee7d9b75de
  }
}
