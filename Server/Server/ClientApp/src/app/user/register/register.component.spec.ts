import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Location} from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule }   from '@angular/forms';

import { RegisterComponent } from './register.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [HttpClientTestingModule,RouterTestingModule.withRoutes([{path:'login',component:LoginTestComponent}]),FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
      // Kilder: https://www.youtube.com/watch?v=UQqQ850dlNI&t=164s
      // Der er taget inspiration fra dette link.
      it('should navigate to /login, after button pressed',()=>{
        const currentUrl = TestBed.get(Location);
        const allButtons = fixture.debugElement.queryAll(By.css('button'));
        // "Go back to login" - button
        const registerButton:HTMLButtonElement = allButtons[1].nativeElement;
        registerButton.click();
        fixture.detectChanges();
        fixture.whenStable().then(()=>{
          expect(currentUrl.path()).toBe('/login');
        })
      });
});
@Component({template:''})
class LoginTestComponent{}