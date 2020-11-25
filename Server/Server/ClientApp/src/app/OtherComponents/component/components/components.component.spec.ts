import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ComponentService} from '../../../Service/ComponentService/component.service';

import { ComponentsComponent } from './components.component';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterModule } from '@angular/router';
import {  MatDialogModule } from '@angular/material/dialog';
import { Location } from '@angular/common';

describe('ComponentsComponent', () => {
  let component: ComponentsComponent;
  let fixture: ComponentFixture<ComponentsComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,RouterModule,RouterTestingModule,MatDialogModule],
      
      
      declarations: [ ComponentsComponent ],
      providers:[
        ComponentService,
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create',()=>{
    expect(component).toBeTruthy();
  })

  it('should be 2 buttons on the page',()=>{
    const allButtons = fixture.debugElement.queryAll(By.css('button'));
    
    expect(allButtons.length == 2).toBeFalse();
  })

  
  it("should be only one table", () => {
    const table = fixture.debugElement.queryAll(By.css('table')); 
    expect(table.length >= 1).toBeTruthy(); 
  });

});
