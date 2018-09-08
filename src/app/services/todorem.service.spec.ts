import { TestBed, inject } from '@angular/core/testing';

import { TodoremService } from './todorem.service';

describe('TodoremService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoremService]
    });
  });

  it('should be created', inject([TodoremService], (service: TodoremService) => {
    expect(service).toBeTruthy();
  }));
});
