import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneraQrIdCifradoComponent } from './genera-qr-id-cifrado.component';

describe('GeneraQrIdCifradoComponent', () => {
  let component: GeneraQrIdCifradoComponent;
  let fixture: ComponentFixture<GeneraQrIdCifradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneraQrIdCifradoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneraQrIdCifradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
