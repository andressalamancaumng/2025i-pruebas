import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CarService, Carro } from './carros.service';

describe('CarService', () => {
  let service: CarService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CarService]
    });

    service = TestBed.inject(CarService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get cars', () => {
    const dummyCars: Carro[] = [
      { id: 1, modelo: 2020, marca: 'Ford', serie: 'XYZ123' },
      { id: 2, modelo: 2019, marca: 'Honda', serie: 'ABC456' }
    ];

    service.getCars().subscribe((cars: Carro[]) => {
      expect(cars.length).toBe(2);
      expect(cars).toEqual(dummyCars);
    });

    const req = httpMock.expectOne('http://localhost:8000/carros/');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCars);
  });

  it('should create a car', () => {
    const newCarData = { modelo: 2021, marca: 'Toyota', serie: 'DEF789' };
    const createdCar: Carro = { id: 3, ...newCarData };

    service.createCarro(newCarData.modelo, newCarData.marca, newCarData.serie).subscribe((car: Carro) => {
      expect(car).toEqual(createdCar);
    });

    const req = httpMock.expectOne('http://localhost:8000/carros/');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCarData);
    req.flush(createdCar);
  });

  it('should delete a car', () => {
    const carId = 1;

    service.deleteCarro(carId).subscribe(response => {
      expect(response).toBeNull(); // ya que el backend retorna vacío
    });

    const req = httpMock.expectOne(`http://localhost:8000/carros/${carId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // simulamos que no devuelve nada
  });
});
