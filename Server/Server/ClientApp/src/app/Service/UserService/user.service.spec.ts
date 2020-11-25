import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Kilder: https://codecraft.tv/courses/angular/unit-testing/mocks-and-spies/
// Inspiration til dette test er fra linket som ses ovenover.

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({   
      imports: [HttpClientTestingModule] 
    });
    service = TestBed.inject(UserService);

  });
  afterEach(() => { 
    localStorage.removeItem('token');
    service = null;
  });

  it('loggedin() returns false when the token doesnt exist', () => {
    expect(service.loggedin()).toBeFalsy();
  });

  it('loggedin() returns true when the token exist', () => {
    localStorage.setItem('token', 'TestToken'); 
    expect(service.loggedin()).toBeTruthy();
  });

});
