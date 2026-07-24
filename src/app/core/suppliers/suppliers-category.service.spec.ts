import { TestBed } from '@angular/core/testing';

import { SuppliersCategoryService } from './suppliers-category.service';

describe('SuppliersCategoryService', () => {
  let service: SuppliersCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuppliersCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
