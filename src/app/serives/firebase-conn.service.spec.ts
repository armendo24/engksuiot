import { TestBed } from '@angular/core/testing';

import { FirebaseConnService } from './firebase-conn.service';

describe('FirebaseConnService', () => {
  let service: FirebaseConnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseConnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
