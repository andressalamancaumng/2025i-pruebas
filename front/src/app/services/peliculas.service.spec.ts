import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PeliculaService } from './peliculas.service';

describe('PeliculaService', () => {
  let service: PeliculaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PeliculaService]
    });

    service = TestBed.inject(PeliculaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Debería crear una película', () => {
    const titulo = 'Inception';
    const year = 2010;
    const director = 'Christopher Nolan';
    const mockResponse = { id: 1, titulo, year, director };

    service.crearPelicula(titulo, year, director).subscribe(pelicula => {
      expect(pelicula).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(r =>
      r.method === 'POST' &&
      r.url === 'http://localhost:8000/peliculas'
    );

    expect(req.request.params.get('titulo')).toBe('Inception');
    expect(req.request.params.get('year')).toBe('2010');
    expect(req.request.params.get('director')).toBe('Christopher Nolan');
    req.flush(mockResponse);
  });

  it('Debe Obtener todas las películas', () => {
    const mockMovies = [{ id: 1, titulo: 'Inception', year: 2010, director: 'Christopher Nolan' }];

    service.obtenerPeliculas().subscribe(peliculas => {
      expect(peliculas).toEqual(mockMovies);
    });

    const req = httpMock.expectOne('http://localhost:8000/peliculas');
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });

  it('Debe Obtener una película por su ID', () => {
    const mockMovie = { id: 1, titulo: 'Inception', year: 2010, director: 'Christopher Nolan' };
    service.obtenerPeliculaPorId(1).subscribe(pelicula => {
      expect(pelicula).toEqual(mockMovie);
    });

    const req = httpMock.expectOne('http://localhost:8000/peliculas/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockMovie);
  });

  it('Debe borrar una película', () => {
    const response = { detail: 'Película eliminada con éxito' };

    service.borarPelicula(1).subscribe(res => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne('http://localhost:8000/peliculas/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(response);
  });
});
