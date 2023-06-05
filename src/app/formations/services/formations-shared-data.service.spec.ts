import { TestBed } from '@angular/core/testing';

import { FormationsSharedDataService } from './formations-shared-data.service';

describe('FormationsSharedDataService', () => {
  let service: FormationsSharedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormationsSharedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
