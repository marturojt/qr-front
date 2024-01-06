import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSiteLayoutComponent } from './public-site-layout.component';

describe('PublicSiteLayoutComponent', () => {
  let component: PublicSiteLayoutComponent;
  let fixture: ComponentFixture<PublicSiteLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicSiteLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicSiteLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
