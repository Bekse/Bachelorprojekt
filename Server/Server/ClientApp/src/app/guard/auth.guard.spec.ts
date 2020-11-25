import { TestBed, async} from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { UserService } from '../Service/UserService/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
describe('AuthGuard', () => {
  let guard: AuthGuard;
  const routerMock = jasmine.createSpyObj('Router', ['navigate']);
  let authMock = jasmine.createSpyObj('UserService', ['isLoggedIn']);
  const test = UserService;

  // Kilder: https://stackoverflow.com/questions/53879869/how-to-unit-test-canactivate-of-angular
  // Der er taget inspiration fra dette link.
  beforeEach(async (() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, HttpClientModule, RouterTestingModule],      
      declarations: [
        AuthGuard
      ],
      providers: [AuthGuard, UserService,{ provide: Router, useValue: authMock }]
    })
  }))

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = new AuthGuard(authMock, routerMock);
    
  });
/*
  it('should return true for canActivate, if user is logged in', () => {
    //isLoggedIn returnere en false værdi, dvs. brugeren er ikke logget ind.
    authMock.isLoggedIn.and.returnValue(true);
    expect(guard.canActivate()).toBe(true);
  });

  it('should return false for canActivate, if user is not logged in', () => {
    //isLoggedIn returnere en false værdi, dvs. brugeren er ikke logget ind.
    authMock.isLoggedIn.and.returnValue(false);
    // Forventer at canActivate() - metode returnere en false værdi.
    expect(guard.canActivate()).toBe(false);
  });

  it('should call navigate, if user isnt logged in', () => {
    //isLoggedIn returnere en false værdi, dvs. brugeren er ikke logget ind.
    authMock.isLoggedIn.and.returnValue(false);
    // Forventet at navigate() bliver kaldt, så brugeren vil blive henviset til forsiden.
    expect(routerMock.navigate).toHaveBeenCalled();
  });
  */
});
