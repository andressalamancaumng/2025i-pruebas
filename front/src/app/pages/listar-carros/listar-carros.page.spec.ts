import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ListarCarrosPage } from './listar-carros.page';

describe('ListarCarrosPage', () => {
  let component: ListarCarrosPage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarCarrosPage, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null
              }
            }
          }
        }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(ListarCarrosPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


