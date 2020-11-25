import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanPropertyDialogComponent } from './loan-property-dialog.component';

describe('LoanPropertyDialogComponent', () => {
  let component: LoanPropertyDialogComponent;
  let fixture: ComponentFixture<LoanPropertyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanPropertyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanPropertyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
