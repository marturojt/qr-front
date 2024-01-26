import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrBuzzwordListadoComponent } from './qr-buzzword-listado.component';

describe('QrBuzzwordListadoComponent', () => {
  let component: QrBuzzwordListadoComponent;
  let fixture: ComponentFixture<QrBuzzwordListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QrBuzzwordListadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QrBuzzwordListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
