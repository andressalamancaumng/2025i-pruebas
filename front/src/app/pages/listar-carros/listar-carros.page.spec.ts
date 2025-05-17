import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarCarrosPage } from './listar-carros.page';
import { CarroService } from '../services/carro.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListarCarrosPage', () => {
  let component: ListarCarrosPage;
  let fixture: ComponentFixture<ListarCarrosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCarrosPage ],
      imports: [ HttpClientTestingModule ],
      providers: [ CarroService ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListarCarrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
