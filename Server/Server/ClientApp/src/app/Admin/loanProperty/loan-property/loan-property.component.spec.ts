import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanPropertyComponent } from './loan-property.component';

describe('LoanPropertyComponent', () => {
  let component: LoanPropertyComponent;
  let fixture: ComponentFixture<LoanPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
