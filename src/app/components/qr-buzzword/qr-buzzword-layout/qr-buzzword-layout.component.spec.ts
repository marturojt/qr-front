import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrBuzzwordLayoutComponent } from './qr-buzzword-layout.component';

describe('QrBuzzwordLayoutComponent', () => {
  let component: QrBuzzwordLayoutComponent;
  let fixture: ComponentFixture<QrBuzzwordLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QrBuzzwordLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QrBuzzwordLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
