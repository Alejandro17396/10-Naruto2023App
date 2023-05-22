import { TestBed } from '@angular/core/testing';

import { NinjasSharedDataService } from './ninjas-shared-data.service';

describe('NinjasSharedDataService', () => {
  let service: NinjasSharedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NinjasSharedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
