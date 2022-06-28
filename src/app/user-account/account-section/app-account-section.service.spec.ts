import { TestBed } from '@angular/core/testing';

import { AppAccountSectionService } from './app-account-section.service';

describe('AppAccountSectionService', () => {
  let service: AppAccountSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppAccountSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
