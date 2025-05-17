import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearCarroPage } from './crear-carro.page';

describe('CrearCarroPage', () => {
  let component: CrearCarroPage;
  let fixture: ComponentFixture<CrearCarroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCarroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
