import { TestBed } from '@angular/core/testing';

import { LoansService } from './loans.service';

describe('MyLoansService', () => {
  let service: LoansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoansService);
  });


});
