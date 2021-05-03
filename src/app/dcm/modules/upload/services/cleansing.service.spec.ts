import { TestBed } from '@angular/core/testing';

import { CleansingService } from './cleansing.service';

describe('CleansingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CleansingService = TestBed.get(CleansingService);
    expect(service).toBeTruthy();
  });
});
