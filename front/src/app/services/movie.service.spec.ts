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

  it('should create a movie (POST)', () => {
    const name = 'Interstellar';
    const year = 2014;
    const director = 'Christopher Nolan';
    const mockResponse = { id: 1, name, year, director };

    service.createMovie(name, year, director).subscribe(movie => {
      expect(movie).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(req =>
      req.method === 'POST' &&
      req.url.startsWith('http://localhost:8000/movies')
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should get all movies (GET)', () => {
    const mockMovies = [{ id: 1, name: 'Interstellar', year: 2014, director: 'Christopher Nolan' }];

    service.getMovies().subscribe(movies => {
      expect(movies).toEqual(mockMovies);
    });

    const req = httpMock.expectOne(req =>
      req.method === 'GET' &&
      req.url.startsWith('http://localhost:8000/movies')
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });

  it('should get a movie by ID or name (GET)', () => {
    const mockMovie = { id: 1, name: 'Interstellar', year: 2014, director: 'Christopher Nolan' };

    service.getMovie(1).subscribe(movie => {
      expect(movie).toEqual(mockMovie);
    });

    const req = httpMock.expectOne('http://localhost:8000/movies/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockMovie);
  });

  it('should delete a movie (DELETE)', () => {
    service.deleteMovie(1).subscribe(response => {
      expect(response).toEqual({ message: 'Movie deleted successfully' });
    });

    const req = httpMock.expectOne('http://localhost:8000/movies/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({ message: 'Movie deleted successfully' });
  });
});