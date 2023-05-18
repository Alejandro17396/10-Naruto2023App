import { TestBed } from '@angular/core/testing';

import { SetItemsServiceService } from './set-items-service.service';

describe('SetItemsServiceService', () => {
  let service: SetItemsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetItemsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
