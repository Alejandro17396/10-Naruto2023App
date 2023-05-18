import { TestBed } from '@angular/core/testing';

import { SetSharedDataService } from './set-shared-data.service';

describe('SetSharedDataService', () => {
  let service: SetSharedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetSharedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
