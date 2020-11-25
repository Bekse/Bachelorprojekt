import { Component, OnInit, Inject } from "@angular/core";
import { ReservationService } from "../../../../Service/ReservationService/reservation.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";

// Kilder: https://material.angular.io/components/dialog/overview

@Component({
  selector: "app-reservation-dialog",
  templateUrl: "./reservation-dialog.component.html",
  styleUrls: ["./reservation-dialog.component.css"],
})
export class ReservationDialogComponent implements OnInit {
  constructor(
    private reservation: ReservationService,
    private router: Router,
    public dialogRef: MatDialogRef<ReservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  reserveComponent(componentId: any) {
    this.reservation.reserveComponent(componentId).subscribe(res => {
      this.router.navigate(["/component-reservation-confirmed/" + res]);
    });
  }

  

}
