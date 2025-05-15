import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeliculasPage } from './peliculas.page';
import { MovieService } from '../../services/movie.service'; 
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('PeliculasPage', () => {
  let component: PeliculasPage;
  let fixture: ComponentFixture<PeliculasPage>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MovieService', ['getMovies', 'createMovie']);

    await TestBed.configureTestingModule({
      imports: [
        PeliculasPage,               
        IonicModule.forRoot(),
        FormsModule,
        CommonModule,
        RouterTestingModule
      ],
      providers: [
        { provide: MovieService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PeliculasPage);
    component = fixture.componentInstance;
    movieServiceSpy = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;

  
    movieServiceSpy.getMovies.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('Debería crear el componente ', () => {
    expect(component).toBeTruthy();
  });

  it('Debería crear una película con los datos correctos', () => {
    component.nuevoTitulo = 'Titanic';
    component.nuevoAnio = 1997;
    component.nuevoDirector = 'James Cameron';

    movieServiceSpy.createMovie.and.returnValue(of({ id: 1, title: 'Titanic', year: 1997, director: 'James Cameron' }));

    component.crearPelicula();

    expect(movieServiceSpy.createMovie).toHaveBeenCalledWith('Titanic', 1997, 'James Cameron');
  });
});
