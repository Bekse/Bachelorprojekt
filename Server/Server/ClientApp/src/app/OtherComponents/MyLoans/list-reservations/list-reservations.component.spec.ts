import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReservationsComponent } from './list-reservations.component';
import { ReservationService } from 'src/app/Service/ReservationService/reservation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
// Kilder: https://www.youtube.com/watch?v=ttM8jHtSkAw&list=PL8jcXf-CLpxolmjV5_taFP0c5LyCveDF1&index=2
// Der er taget inspiration fra dette link.
describe('ListReservationsComponent', () => {
  let component: ListReservationsComponent;
  let fixture: ComponentFixture<ListReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReservationsComponent ],
      imports:[RouterTestingModule],
      providers:[{
        provide: ReservationService,useClass: ReservationServiceStub
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component',()=>{
      expect(component).toBeTruthy();
  })

  it('should contain a mat-card-title',()=>{
    const titleElement = fixture.debugElement.query(By.css('mat-card-title'));
    expect(titleElement.nativeElement.textContent).toBe('List of your reservations');
  })

});
class ReservationServiceStub{

  getListReservation() {
    return of([]);
  }

}