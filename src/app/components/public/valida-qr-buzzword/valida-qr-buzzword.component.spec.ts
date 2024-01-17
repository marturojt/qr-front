import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidaQrBuzzwordComponent } from './valida-qr-buzzword.component';

describe('ValidaQrBuzzwordComponent', () => {
  let component: ValidaQrBuzzwordComponent;
  let fixture: ComponentFixture<ValidaQrBuzzwordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidaQrBuzzwordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidaQrBuzzwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
