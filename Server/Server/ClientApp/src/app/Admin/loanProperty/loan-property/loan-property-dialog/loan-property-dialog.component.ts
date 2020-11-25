import { Component, OnInit, Inject } from "@angular/core";
import { LoansService} from '../../../../Service/LoansService/loans.service';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ReservationService } from 'src/app/Service/ReservationService/reservation.service';

// Kilder: https://material.angular.io/components/dialog/overview

@Component({
  selector: 'app-loan-property-dialog',
  templateUrl: './loan-property-dialog.component.html',
  styleUrls: ['./loan-property-dialog.component.css']
})
export class LoanPropertyDialogComponent implements OnInit {

  constructor(private loanService: LoansService, private reservationService: ReservationService, public dialogRef: MatDialogRef < LoanPropertyDialogComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}
  loanComponent() {
    this.loanService.postLoan(this.data.userId, this.data.componentData).subscribe((res: any) => {
      // Denne if-statement bliver kørt, hvis man låner fra reservations tabellen, 
      // da den skal slette resevationen, efter man har lånet den ud.
      if (this.data.reservationId != null) {
        this.reservationService.deleteReservation(this.data.reservationId).subscribe(res => {
          window.location.reload();
        })
      } else {
        window.location.reload();
      }
    });
  }
}
