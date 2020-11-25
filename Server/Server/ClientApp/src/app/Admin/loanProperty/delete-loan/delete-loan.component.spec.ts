import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLoanComponent } from './delete-loan.component';

describe('DeleteLoanComponent', () => {
  let component: DeleteLoanComponent;
  let fixture: ComponentFixture<DeleteLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
