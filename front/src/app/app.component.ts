import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, HttpClientModule],
  standalone: true,
})
export class AppComponent implements OnInit {
  Users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log("ngOnInit ejecutado");
    this.loadUsers();
  }

  loadUsers() {
    console.log("Intentando cargar usuarios...");
    this.http.get('http://localhost:8000/users/').subscribe((data: any) => {
      this.Users = data;
      console.log('Usuarios cargados:', this.Users);
    });
  }
}