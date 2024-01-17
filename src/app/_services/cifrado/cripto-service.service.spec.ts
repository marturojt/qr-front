import { TestBed } from '@angular/core/testing';

import { CriptoServiceService } from './cripto-service.service';

describe('CriptoServiceService', () => {
  let service: CriptoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriptoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
