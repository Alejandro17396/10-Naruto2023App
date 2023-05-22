import { TestBed } from '@angular/core/testing';

import { AccesorieSetItemsService } from './accesorie-set-items.service';

describe('AccesorieSetItemsService', () => {
  let service: AccesorieSetItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccesorieSetItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
