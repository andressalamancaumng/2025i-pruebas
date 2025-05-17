import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearCarroPage } from './crear-carro.page';
import { CarroService } from '../services/carro.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CrearCarroPage', () => {
  let component: CrearCarroPage;
  let fixture: ComponentFixture<CrearCarroPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCarroPage ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [ CarroService ]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearCarroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
