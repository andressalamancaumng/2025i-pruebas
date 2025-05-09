
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PeliculasService } from './peliculas.service';

describe('PeliculasService', () => {
  let service: PeliculasService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PeliculasService]
    });
    service = TestBed.inject(PeliculasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crear pelicula (POST)', () => {
    const name_movie = 'Inception';
    const anio = 2010;
    const director='Christopher Nolan'
    const mockResponse = { id: 1, name_movie, anio,director };

    service.createPelicula(name_movie, anio, director).subscribe(pelicula => {
      expect(pelicula).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(req =>
      req.method === 'POST' &&
      req.url.startsWith('http://localhost:8000/peliculas')
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('debería obtener peliculas (GET)', () => {
    const mockPeliculas = [{ id: 1, name_movie: 'Inception', anio:2010,director:'Christopher Nolan' }];

    service.obtenerPeliculas().subscribe(users => {
     expect(users).toEqual(mockPeliculas);
    });

    const req = httpMock.expectOne(req =>
      req.method === 'GET' &&
      req.url.startsWith('http://localhost:8000/users')
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockPeliculas);
  });
});
