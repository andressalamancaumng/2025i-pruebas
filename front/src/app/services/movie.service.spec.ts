import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Debería crear una película', () => {
    const title = 'Inception';
    const year = 2010;
    const director = 'Christopher Nolan';
    const mockResponse = { id: 1, title, year, director };

    service.createMovie(title, year, director).subscribe(movie => {
      expect(movie).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(r =>
      r.method === 'POST' &&
      r.url === 'http://localhost:8000/movies/'
    );

    expect(req.request.params.get('title')).toBe('Inception');
    expect(req.request.params.get('year')).toBe('2010');
    expect(req.request.params.get('director')).toBe('Christopher Nolan');
    req.flush(mockResponse);
  });

  it('Debe Obtener todas las películas', () => {
    const mockMovies = [{ id: 1, title: 'Inception', year: 2010, director: 'Christopher Nolan' }];

    service.getMovies().subscribe(movies => {
      expect(movies).toEqual(mockMovies);
    });

    const req = httpMock.expectOne('http://localhost:8000/movies/');
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });

  it('Debe Obtener una película por su título', () => {
    const mockMovie = { id: 1, title: 'Inception', year: 2010, director: 'Christopher Nolan' };

    // Usamos un título no vacío para que la URL sea /movies/Inception
    service.getMovieById('Inception').subscribe(movie => {
      expect(movie).toEqual(mockMovie);
    });

    const req = httpMock.expectOne('http://localhost:8000/movies/Inception');
    expect(req.request.method).toBe('GET');
    req.flush(mockMovie);
  });

  it('Debe borrar una película', () => {
    const response = { detail: 'Película eliminada con éxito' };

    service.deleteMovie(1).subscribe(res => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne('http://localhost:8000/movies/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(response);
  });
});
