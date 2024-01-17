import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneraQrBuzzwordComponent } from './genera-qr-buzzword.component';

describe('GeneraQrBuzzwordComponent', () => {
  let component: GeneraQrBuzzwordComponent;
  let fixture: ComponentFixture<GeneraQrBuzzwordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneraQrBuzzwordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneraQrBuzzwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
