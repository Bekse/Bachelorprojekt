import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanGetUserComponent } from './loan-get-user.component';

describe('LoanGetUserComponent', () => {
  let component: LoanGetUserComponent;
  let fixture: ComponentFixture<LoanGetUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanGetUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanGetUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
