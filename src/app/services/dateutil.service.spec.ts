import { TestBed, inject } from '@angular/core/testing';

import { DateutilService } from './dateutil.service';

describe('DateutilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateutilService]
    });
  });

  it('should be created', inject([DateutilService], (service: DateutilService) => {
    expect(service).toBeTruthy();
  }));
});
