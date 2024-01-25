import { TestBed } from '@angular/core/testing';

import { QrBuzzService } from './qr-buzz.service';

describe('QrBuzzService', () => {
  let service: QrBuzzService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrBuzzService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
