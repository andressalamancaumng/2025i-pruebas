import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  const dummyUser = {
    id: 1,
    name: 'Juan',
    email: 'juan@example.com',
    document: '123456789'
  };

  it('debe crear un usuario', () => {
    const newUser = {
      name: 'Juan',
      email: 'juan@example.com',
      document: '123456789'
    };

    service.createUser(newUser).subscribe(response => {
      expect(response).toEqual(dummyUser);
    });

    const req = httpMock.expectOne('http://localhost:8000/users/');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush(dummyUser);
  });

  it('debe buscar un usuario por ID', () => {
    service.searchUsers({ id: 1 }).subscribe(result => {
      expect(result).toEqual([dummyUser]);
    });

    const req = httpMock.expectOne('http://localhost:8000/users/search?id=1');
    expect(req.request.method).toBe('GET');
    req.flush([dummyUser]);
  });

  it('debe buscar un usuario por documento', () => {
    service.searchUsers({ document: '123456789' }).subscribe(result => {
      expect(result).toEqual([dummyUser]);
    });

    const req = httpMock.expectOne('http://localhost:8000/users/search?document=123456789');
    expect(req.request.method).toBe('GET');
    req.flush([dummyUser]);
  });

  it('debe eliminar un usuario por ID', () => {
    const id = 1;

    service.deleteUser(id).subscribe(response => {
      expect(response).toEqual({ message: 'User deleted' });
    });

    const req = httpMock.expectOne(`http://localhost:8000/users/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ message: 'User deleted' });
  });
});
