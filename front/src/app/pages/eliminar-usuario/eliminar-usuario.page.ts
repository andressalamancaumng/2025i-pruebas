import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton,IonLabel,IonItem,IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.page.html',
  styleUrls: ['./eliminar-usuario.page.scss'],
  standalone: true,
  imports: [IonContent, 
    IonHeader, 
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonItem,
    IonButton,
    IonLabel]
})
export class EliminarUsuarioPage implements OnInit {
    UserId='';
  constructor(private router: Router) { }

  ngOnInit() {
  }
  volverAListado() {
    this.router.navigate(['/listado-usuarios']);
  }
}
