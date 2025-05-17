import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-user-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss'],
})
export class AddUserModalComponent {
  name = '';
  email = '';
  document = '';

  constructor(
    private modalController: ModalController,
    private userService: UserService
  ) {}

  close() {
    this.modalController.dismiss();
  }

  save() {
    if (!this.name || !this.email || !this.document) return;

    this.userService.createUser({
      name: this.name,
      email: this.email,
      document: this.document
    }).subscribe({
      next: () => this.modalController.dismiss(true),
      error: (err) => {
        console.error('Error al crear usuario:', err);
        alert('Error al crear usuario');
      }
    });
  }
}
