// src/app/home/home.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton
  ],
})
export class HomePage {
  users: any[] = [];  // Aquí guardamos la lista de usuarios
  newUser = { name: '', email: '' };  // Datos del nuevo usuario
  searchQuery: string = '';  // Valor de búsqueda

  constructor(private userService: UserService) {
    this.loadUsers();  // Cargar los usuarios al iniciar
  }

  // Método para cargar los usuarios desde el servicio
  loadUsers(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  // Método para crear un nuevo usuario
  createUser(): void {
    if (this.newUser.name && this.newUser.email) {
      this.userService.createUser(this.newUser.name, this.newUser.email).subscribe(() => {
        this.newUser = { name: '', email: '' };  // Limpiar campos después de crear
        this.loadUsers();  // Recargar usuarios
      });
    }
  }

  // Método para eliminar un usuario por ID
  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();  // Recargar usuarios después de eliminar
    });
  }

  // Método para buscar usuarios por nombre, correo o documento
  searchUsers(): void {
    if (this.searchQuery.trim() === '') {
      this.loadUsers();  // Si no hay búsqueda, recarga todos los usuarios
    } else {
      this.userService.searchUsers(this.searchQuery).subscribe((data) => {
        this.users = data;  // Actualiza la lista con los usuarios encontrados
      });
    }
  }
}