import { TestBed } from '@angular/core/testing';

import { VerifyDomainService } from './verify-domain.service';

describe('VerifyDomainService', () => {
  let service: VerifyDomainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyDomainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
