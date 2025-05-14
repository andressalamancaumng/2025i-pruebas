
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

  it('debería crear usuario (POST)', () => {
    const name = 'Pedro';
    const email = 'pedro@example.com';
    const mockResponse = { id: 1, name, email };

    service.createUser(name, email).subscribe(user => {
      expect(user).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(req =>
      req.method === 'POST' &&
      req.url.startsWith('http://localhost:8000/users')
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('debería obtener usuarios (GET)', () => {
    const mockUsers = [{ id: 1, name: 'Ana', email: 'ana@example.com' }];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(req =>
      req.method === 'GET' &&
      req.url.startsWith('http://localhost:8000/users')
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
