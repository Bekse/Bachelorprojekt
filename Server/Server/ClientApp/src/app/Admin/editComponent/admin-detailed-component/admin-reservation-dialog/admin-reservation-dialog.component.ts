import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ReservationService } from 'src/app/Service/ReservationService/reservation.service';
@Component({
  selector: "app-admin-reservation-dialog",
  templateUrl: "./admin-reservation-dialog.component.html",
  styleUrls: ["./admin-reservation-dialog.component.css"],
})
export class AdminReservationDialogComponent implements OnInit {
  constructor(private reservationService: ReservationService, private router: Router,
    public dialogRef: MatDialogRef < AdminReservationDialogComponent > , @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}

  reserveComponent(componentId: any) {
    this.reservationService.adminReserveComponent(componentId).subscribe(res => {
      this.router.navigate([
        "/component-reservation-confirmed/" + res,
      ]);
    });
  }
}
