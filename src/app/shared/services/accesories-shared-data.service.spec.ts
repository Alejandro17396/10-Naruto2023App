import { TestBed } from '@angular/core/testing';

import { AccesoriesSharedDataService } from './accesories-shared-data.service';

describe('AccesoriesSharedDataService', () => {
  let service: AccesoriesSharedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccesoriesSharedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
