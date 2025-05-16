import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesPage } from './peliculas.page';
import { MovieService } from '../../services/pelicula.service';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('MoviesPage', () => {
  let component: MoviesPage;
  let fixture: ComponentFixture<MoviesPage>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MovieService', ['getMovies', 'createMovie']);

    await TestBed.configureTestingModule({
      imports: [
        MoviesPage,
        IonicModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: MovieService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesPage);
    component = fixture.componentInstance;
    movieServiceSpy = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;

    movieServiceSpy.getMovies.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call createMovie with correct data', () => {
    component.movieName = 'Matrix';
    component.movieYear = 1999;
    component.movieDirector = 'Wachowskis';

    movieServiceSpy.createMovie.and.returnValue(of({}));

    component.createMovie();

    expect(movieServiceSpy.createMovie).toHaveBeenCalledWith('Matrix', 1999, 'Wachowskis');
  });
});