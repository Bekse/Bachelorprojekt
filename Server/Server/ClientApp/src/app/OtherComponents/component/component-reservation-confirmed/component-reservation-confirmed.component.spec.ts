import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentReservationConfirmedComponent } from './component-reservation-confirmed.component';

describe('ComponentReservationConfirmedComponent', () => {
  let component: ComponentReservationConfirmedComponent;
  let fixture: ComponentFixture<ComponentReservationConfirmedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentReservationConfirmedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentReservationConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
