import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieListPage } from './pelicula-list.page';
import { MovieService } from '../../services/movie.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('MovieListPage', () => {
  let component: MovieListPage;
  let fixture: ComponentFixture<MovieListPage>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;

  const fakeActivatedRoute = {
    snapshot: { paramMap: { get: () => null } }
  };

  beforeEach(async () => {
    movieServiceSpy = jasmine.createSpyObj('MovieService', ['getMovies']);
    navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateForward']);
    movieServiceSpy.getMovies.and.returnValue(of([
      { id: 1, name: 'Toy Story', year: 1995, director: 'John Lasseter' }
    ]));

    await TestBed.configureTestingModule({
      imports: [MovieListPage],
      providers: [
        { provide: MovieService, useValue: movieServiceSpy },
        { provide: NavController, useValue: navCtrlSpy },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar películas en la vista', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const listItems = compiled.querySelectorAll('ion-item');
    expect(listItems.length).toBeGreaterThan(0);
    expect(listItems[0].textContent).toContain('Toy Story');
  });

  it('debería manejar error al obtener películas', () => {
    movieServiceSpy.getMovies.and.returnValue(throwError(() => new Error('Error')));
    fixture = TestBed.createComponent(MovieListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.movies).toEqual([]);
  });
});