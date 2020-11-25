import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetailedComponentComponent } from './admin-detailed-component.component';

describe('AdminDetailedComponentComponent', () => {
  let component: AdminDetailedComponentComponent;
  let fixture: ComponentFixture<AdminDetailedComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDetailedComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDetailedComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
