import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ReservationService } from 'src/app/Service/ReservationService/reservation.service';
// Kilder: https://material.angular.io/components/table/overview
// Der er taget inspiration fra dette link, til at oprette en tabel
@Component({
  selector: 'app-list-reservations',
  templateUrl: './list-reservations.component.html',
  styleUrls: ['./list-reservations.component.css']
})
export class ListReservationsComponent implements OnInit {
  constructor(private reservationService: ReservationService, private router: Router) {}

  displayedColumns: string[] = ['componentName', 'componentNo', 'adminComment', 'reservedDate', 'delete'];
  listReservationData;

  ngOnInit() {
    this.reservationService.getListReservation().subscribe(res => {
      this.listReservationData = res;
    });
  }

  deleteData(resevertionId: any) {
    this.router.navigate(["/delete-reservation/" + resevertionId]);
  }
}
