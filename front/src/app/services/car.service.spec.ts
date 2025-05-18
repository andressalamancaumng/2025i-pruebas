import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CarService } from './car.service';

describe('UserService', () => {
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

    it('debería crear película (POST)', () => {
        const marca = 'Inception';
        const modelo = 2010;
        const serie = 'Christopher Nolan';
        const mockResponse = { id: 1, marca, modelo, serie };

        service.createCarro(marca, modelo, serie).subscribe(cars => {
            expect(cars).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(req =>
            req.method === 'POST' &&
            req.url.startsWith('http://localhost:8000/carros')
        );
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({ marca, modelo, serie }); // Verifica el cuerpo de la solicitud
        req.flush(mockResponse);
    });

    it('debería obtener películas (GET)', () => {
        const mockCars = [{ id: 1, marca: 'Inception', modelo: 2010, serie: 'Christopher Nolan' }];

        service.getCarros().subscribe(cars => {
            expect(cars).toEqual(mockCars);
        });

        const req = httpMock.expectOne(req =>
            req.method === 'GET' &&
            req.url.startsWith('http://localhost:8000/carros')
        );
        expect(req.request.method).toBe('GET');
        req.flush(mockCars);
    });
});