import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponentsListComponent } from './admin-components-list.component';

describe('AdminComponentsListComponent', () => {
  let component: AdminComponentsListComponent;
  let fixture: ComponentFixture<AdminComponentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminComponentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
