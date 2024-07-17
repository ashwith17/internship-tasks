import { TestBed } from '@angular/core/testing';

import { DepartentService } from './departent.service';

describe('DepartentService', () => {
  let service: DepartentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
