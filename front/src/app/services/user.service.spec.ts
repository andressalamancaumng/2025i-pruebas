import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crear película (POST)', () => {
    const name = 'Inception';
    const year = 2010;
    const name_Director = 'Christopher Nolan';
    const mockResponse = { id: 1, name, year, name_Director };

    service.createMovie(name, year, name_Director).subscribe(movie => {
      expect(movie).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(req =>
      req.method === 'POST' &&
      req.url.startsWith('http://localhost:8000/movies')
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ name, year, name_Director }); // Verifica el cuerpo de la solicitud
    req.flush(mockResponse);
  });

  it('debería obtener películas (GET)', () => {
    const mockMovies = [{ id: 1, name: 'Inception', year: 2010, name_Director: 'Christopher Nolan' }];

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
});
