import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CrearCarroPage } from './crear-carro.page';

describe('CrearCarroPage', () => {
  let component: CrearCarroPage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearCarroPage, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null, // Puedes simular el valor que esperes
              }
            }
          }
        }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(CrearCarroPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



