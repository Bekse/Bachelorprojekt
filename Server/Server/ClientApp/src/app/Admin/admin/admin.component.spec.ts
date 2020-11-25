import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { UserService } from 'src/app/Service/UserService/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Component } from '@angular/core';
import {Location} from '@angular/common';
import { By } from '@angular/platform-browser';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture < AdminComponent > ;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
        declarations: [AdminComponent, AdminCreateComponentTestComponent],

        imports: [RouterTestingModule.withRoutes([{
          path: 'create-component',
          component: AdminCreateComponentTestComponent
        }])],
        providers: [{
          provide: UserService,
          useClass: UserServiceStub
        }]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Tester om den har på den rette side, før knappen trykkes.
  it('should navigate to /admin, before button pressed', () => {
    const currentLocation = TestBed.get(Location);
    expect(currentLocation.path()).toBe('');
  });
  /*
        // Kilder: https://www.youtube.com/watch?v=UQqQ850dlNI&t=164s
        // Der er taget inspiration fra dette link.
        it('should navigate to /create-component, after button pressed',()=>{
          const location = TestBed.get(Location);
          const linkdes = fixture.debugElement.queryAll(By.css('button'));
          // "Go back to login" - button
          const nativeButton:HTMLButtonElement = linkdes[0].nativeElement;
          nativeButton.click();
          fixture.detectChanges();
          fixture.whenStable().then(()=>{
            expect(location.path()).toBe('/create-component');

          })
        });
  */
});
class UserServiceStub {
  getUserpayload() {
    return of({
      role: "Student"
    })
  }
}
@Component({
  template: ''
})
class AdminCreateComponentTestComponent {}
