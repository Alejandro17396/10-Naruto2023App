import { TestBed } from '@angular/core/testing';

import { AccesoriesService } from './accesories.service';

describe('AccesoriesService', () => {
  let service: AccesoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccesoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
