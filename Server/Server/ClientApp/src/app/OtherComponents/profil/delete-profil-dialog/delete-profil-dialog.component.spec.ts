import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProfilDialogComponent } from './delete-profil-dialog.component';

describe('DeleteProfilDialogComponent', () => {
  let component: DeleteProfilDialogComponent;
  let fixture: ComponentFixture<DeleteProfilDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteProfilDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProfilDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
