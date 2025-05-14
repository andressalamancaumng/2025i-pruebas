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
  IonButton,
  IonList,
  IonItem,
  IonLabel
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
    IonButton,
    IonList,
    IonItem,
    IonLabel
  ],
})
export class HomePage {
  users: any[] = [];
  newUser = { name: '', email: '', document: '' };
  searchQuery: string = '';

  constructor(private userService: UserService) {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  createUser(): void {
    const { name, email, document } = this.newUser;
    if (name && email && document) {
      this.userService.createUser(name, email, document).subscribe(() => {
        this.newUser = { name: '', email: '', document: '' };
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
        this.users = data;
      });
    }
  }
}