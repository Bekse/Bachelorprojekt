import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Location } from "@angular/common";
import { ReservationService } from 'src/app/Service/ReservationService/reservation.service';

@Component({
  selector: 'app-delete-reservation',
  templateUrl: './delete-reservation.component.html',
  styleUrls: ['./delete-reservation.component.css']
})
export class DeleteReservationComponent implements OnInit {
  constructor(private activatedRouter: ActivatedRoute, private reservationService: ReservationService, private _location: Location) {}
  reservationToBeDeletedData;

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      this.reservationService.getReservationConfirmed(params['id']).subscribe(res => {
        this.reservationToBeDeletedData = res;
      });
    });
  }

  backToPreviousPage() {
    this._location.back();
  }

  deleteReservation(reservationId: any) {
    this.reservationService.deleteReservation(reservationId).subscribe(res => {
      this._location.back();
    });
  }
}
