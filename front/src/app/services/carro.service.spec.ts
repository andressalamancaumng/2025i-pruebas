import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CarsService } from './carro.service';  // Asegúrate que la ruta es correcta

describe('CarroService', () => {
  let service: CarsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CarsService]
    });
    service = TestBed.inject(CarsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crear un carro (POST)', () => {
    const modelo = 2024;
    const marca = 'Toyota';
    const serie = 'ABC123';
    const mockResponse = { id: 1, modelo, marca, serie };

    service.createCars(modelo, marca, serie).subscribe(carro => {
      expect(carro).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8000/carros/');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ modelo, marca, serie });
    req.flush(mockResponse);
  });

  it('debería obtener carros (GET)', () => {
    const mockCarros = [{ id: 1, modelo: 2023, marca: 'Ford', serie: 'XYZ987' }];

    service.getCarros().subscribe(carros => {
      expect(carros).toEqual(mockCarros);
    });

    const req = httpMock.expectOne('http://localhost:8000/carros/');
    expect(req.request.method).toBe('GET');
    req.flush(mockCarros);
  });
});
