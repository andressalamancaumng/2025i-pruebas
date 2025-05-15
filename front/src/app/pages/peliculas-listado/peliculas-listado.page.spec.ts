import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeliculasListadoPage } from './peliculas-listado.page';
import { MovieService } from '../../services/movie.service'; 
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('PeliculasListadoPage', () => {
  let component: PeliculasListadoPage;
  let fixture: ComponentFixture<PeliculasListadoPage>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MovieService', ['getMovies', 'deleteMovie']);

    await TestBed.configureTestingModule({
      imports: [
        PeliculasListadoPage,       
        IonicModule.forRoot(),
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: MovieService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PeliculasListadoPage);
    component = fixture.componentInstance;
    movieServiceSpy = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;

    // simular listado inicial
    movieServiceSpy.getMovies.and.returnValue(of([
      { id: 1, title: 'Inception', year: 2010, director: 'Christopher Nolan' },
      { id: 2, title: 'Avatar',    year: 2009, director: 'James Cameron' }
    ]));

    fixture.detectChanges();
  });

  it('Debe Crear el componente', () => {
    expect(component).toBeTruthy();
  });

it('debería filtrar películas por término de búsqueda', () => {
  component.movies = [
    { id: 1, title: 'Inception', year: 2010, director: 'Nolan' },
    { id: 2, title: 'Avatar', year: 2009, director: 'Cameron' }
  ];
  component.searchTerm = 'Inception';
  component.applyFilter();

  expect(component.filteredMovies.length).toBe(1);
  expect(component.filteredMovies[0].title).toBe('Inception');
});

  it('Debería llamar a deleteMovie con el ID correcto', () => {
    movieServiceSpy.deleteMovie.and.returnValue(of({ detail: 'Película eliminada con éxito' }));

    component.deleteMovie(1);

    expect(movieServiceSpy.deleteMovie).toHaveBeenCalledWith(1);
  });
});
