import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
<<<<<<< HEAD
  constructor() {}
}
=======
  users: any[] = [];
  newUser = { nombre: '', correo: '', documento: '' };
  searchQuery: string = '';

  constructor(private userService: UserService) {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = Array.isArray(data) ? data : [data];
    });
  }

  createUser(): void {
    const { nombre, correo, documento } = this.newUser;
    if (nombre && correo && documento) {
      this.userService.createUser(nombre, correo, documento).subscribe(() => {
        this.newUser = { nombre: '', correo: '', documento: '' };
        this.loadUsers();
      });
    }
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  searchUsers(): void {
    if (this.searchQuery.trim() === '') {
      this.loadUsers();
    } else {
      this.userService.searchUsers(this.searchQuery).subscribe((data) => {
        this.users = Array.isArray(data) ? data : [data];
      });
    }
  }
}
>>>>>>> 0588082311a5b810d900046bcb4052ee7d9b75de
