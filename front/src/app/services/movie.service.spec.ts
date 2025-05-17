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

  it('debería crear una película (POST)', () => {
    const name = 'Toy Story';
    const year = 1995;
    const director = 'John Lasseter';
    const mockResponse = { id: 1, name, year, director };

    service.createMovie(name, year, director).subscribe(movie => {
      expect(movie).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8000/movies');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ name, year, director });
    req.flush(mockResponse);
  });

  it('debería obtener todas las películas (GET)', () => {
    const mockMovies = [{ id: 1, name: 'Toy Story', year: 1995, director: 'John Lasseter' }];

    service.getMovies().subscribe(movies => {
      expect(movies).toEqual(mockMovies);
    });

    const req = httpMock.expectOne('http://localhost:8000/movies');
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });

  it('debería obtener una película por ID o nombre (GET)', () => {
    const mockMovie = { id: 1, name: 'Interstellar', year: 2014, director: 'Christopher Nolan' };

    service.getMovie(1).subscribe(movie => {
      expect(movie).toEqual(mockMovie);
    });

    const req = httpMock.expectOne('http://localhost:8000/movies/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockMovie);
  });

  it('debería eliminar una película (DELETE)', () => {
    const responseMessage = { message: 'Movie deleted successfully' };

    service.deleteMovie(1).subscribe(response => {
      expect(response).toEqual(responseMessage);
    });

    const req = httpMock.expectOne('http://localhost:8000/movies/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(responseMessage);
  });
});
