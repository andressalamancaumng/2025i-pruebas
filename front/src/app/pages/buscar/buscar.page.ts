import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput,
  IonItem,
  IonList,
  IonNote,
  IonTextarea,
  IonToggle,
  IonLabel,
  IonSegment, 
  IonSegmentButton,
  IonButton ,
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar 
  } from '@ionic/angular/standalone';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
  standalone: true,
  imports: [ 
    IonHeader,
    IonInput,
    IonItem,
    IonList,
    IonNote,
    IonTextarea,
    IonTitle,
    IonToggle,
    IonLabel, 
    IonSegment, 
    IonSegmentButton,
    IonButton,
    IonContent, 
    IonToolbar,
    CommonModule,
    FormsModule]
})
export class BuscarPage implements OnInit {   

    Button ='Id';
    IdUser ='';
    NameUser ='';
    EmailUser ='';
    DocumentUser ='';
   constructor(private router: Router) { }

  ngOnInit() {
  }
  volverAListado() {
    this.router.navigate(['/listado-usuarios']);
  }

}
