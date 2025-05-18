import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-listado-carros',
  templateUrl: './listado-carros.page.html',
  styleUrls: ['./listado-carros.page.scss'],
  standalone: true,
  imports: [IonicModule, NgFor, AsyncPipe, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class ListadoCarrosPage implements OnInit {
  carros: any[] = [];
  constructor(private userService: UserService) {
    this.userService.getCars().subscribe((data) => {
      this.carros = data;
    });
  }

  ngOnInit() {
  }
}
