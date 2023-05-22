import { TestBed } from '@angular/core/testing';

import { NinjasServiceService } from './ninjas-service.service';

describe('NinjasServiceService', () => {
  let service: NinjasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NinjasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
