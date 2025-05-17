import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../services/user.service';
import { AddUserModalComponent } from '../modals/add-user-modal/add-user-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  users: User[] = [];
  searchTerm: string = '';

  constructor(
    private userService: UserService,
    private modalController: ModalController
  ) {}

  ionViewWillEnter() {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(u => u.id !== id);
    });
  }

  search() {
    if (!this.searchTerm.trim()) return;

    this.userService.searchUsers({ name: this.searchTerm }).subscribe({
      next: result => {
        this.users = result || [];
      },
      error: () => {
        this.users = [];
      }
    });
  }

  async openAddUserModal() {
  const modal = await this.modalController.create({
    component: AddUserModalComponent,
    cssClass: 'modal-wrapper', 
    showBackdrop: true,
    backdropDismiss: false
  });

  modal.onDidDismiss().then(result => {
    if (result.data) {
      this.ionViewWillEnter();
    }
  });

  await modal.present();
}

}
