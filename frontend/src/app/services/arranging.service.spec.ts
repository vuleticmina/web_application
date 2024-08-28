import { TestBed } from '@angular/core/testing';

import { ArrangingService } from './arranging.service';

describe('ArrangingService', () => {
  let service: ArrangingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrangingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
