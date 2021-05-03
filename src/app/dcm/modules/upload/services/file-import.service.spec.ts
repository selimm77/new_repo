import { TestBed } from '@angular/core/testing';

import { FileImportService } from './file-import.service';

describe('FileImportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileImportService = TestBed.get(FileImportService);
    expect(service).toBeTruthy();
  });
});
