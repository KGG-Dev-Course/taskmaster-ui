import { TestBed } from '@angular/core/testing';

import { GoogleService } from './google.service';

describe('GoogleService', () => {
  let service: GoogleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
