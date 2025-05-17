import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeliculasPage } from './peliculas.page';
import { PeliculaService } from '../../services/peliculas.service'; 
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('PeliculasPage', () => {
  let component: PeliculasPage;
  let fixture: ComponentFixture<PeliculasPage>;
  let movieServiceSpy: jasmine.SpyObj<PeliculaService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('PeliculaService', ['obtenerPeliculas', 'crearPelicula']);

    await TestBed.configureTestingModule({
      imports: [
        PeliculasPage,               
        IonicModule.forRoot(),
        FormsModule,
        CommonModule,
        RouterTestingModule
      ],
      providers: [
        { provide: PeliculaService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PeliculasPage);
    component = fixture.componentInstance;
    movieServiceSpy = TestBed.inject(PeliculaService) as jasmine.SpyObj<PeliculaService>;

  
    movieServiceSpy.obtenerPeliculas.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('Debería crear el componente ', () => {
    expect(component).toBeTruthy();
  });

  it('Debería crear una película con los datos correctos', () => {
    component.tituloNuevo = 'Titanic';
    component.yearNuevo = 1997;
    component.directorNuevo = 'James Cameron';

    movieServiceSpy.crearPelicula.and.returnValue(of({ id: 1, title: 'Titanic', year: 1997, director: 'James Cameron' }));

    component.agregarPelicula();

    expect(movieServiceSpy.crearPelicula).toHaveBeenCalledWith('Titanic', 1997, 'James Cameron');
  });
});
