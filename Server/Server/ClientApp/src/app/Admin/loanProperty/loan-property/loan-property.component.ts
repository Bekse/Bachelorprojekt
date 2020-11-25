import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {LoansService} from '../../../Service/LoansService/loans.service';
import {LoanPropertyDialogComponent} from '../loan-property/loan-property-dialog/loan-property-dialog.component';
import {ComponentService} from '../../../Service/ComponentService/component.service';
import { MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatTableDataSource} from '@angular/material/table';
import { NgForm } from "@angular/forms";
import { UserService } from 'src/app/Service/UserService/user.service';
// Kilder: https://material.angular.io/components/table/overview
// Der er taget inspiration fra dette link, til at oprette en tabel
@Component({
  selector: 'app-loan-property',
  templateUrl: './loan-property.component.html',
  styleUrls: ['./loan-property.component.css']
})
export class LoanPropertyComponent implements OnInit {
  constructor(private router: Router, private activatedRouter: ActivatedRoute, private loanService: LoansService,
    private componentService: ComponentService, private dialog: MatDialog, private userService: UserService) {}

  displayedColumns: string[] = ['componentImage', 'componentName', 'componentInfo', 'componentStatus', 'D/L'];
  reservationDisplayedColumns: string[] = ['componentName', 'componentNo', 'adminComment', 'reservedDate', 'delete'];
  loanDisplayedColumns: string[] = ['componentName', 'componentNo', 'adminComment', 'loanDate', 'returnDate', 'delete'];
  id;
  dataComponents;
  editUserLoans;
  allResponseData;
  reservations;
  userRole;
  clerkPermission = true;
  ngOnInit() {
    this.userRole = this.userService.getUserpayload();
    if (this.userRole.role == "Clerk") {
      this.clerkPermission = false;
    }
    this.activatedRouter.params.subscribe((params) => {
      this.loanService.getLoanReservationList(params["id"]).subscribe((res) => {
        this.allResponseData = res;
        this.editUserLoans = this.allResponseData.loans;
        this.reservations = this.allResponseData.reservations;
        this.id = params["id"];
      });
    });

    this.componentService.getComponents().subscribe(res => {
      // Laver en instance af datacomponent af MatTableDataSource.
      this.dataComponents = new MatTableDataSource( < any > res);
    });
  }
  // kilder: https://www.youtube.com/watch?v=ZL0d3M3uoRQ
  reservationTableloanComponent(componentId: any, reservationId: any) {
    this.componentService.getComponentDetail(componentId).subscribe(res => {
      const dialogConfig = new MatDialogConfig();
      // Når brugeren trykker uden om dialog, så vil den lukke den ned.
      dialogConfig.disableClose = true;
      this.dialog.open(LoanPropertyDialogComponent, {
        data: {
          userId: this.id,
          componentData: res,
          reservationId: reservationId
        }
      });
    })
  }

  // kilder: https://www.youtube.com/watch?v=ZL0d3M3uoRQ
  loanComponent(componentData: any) {
    const dialogConfig = new MatDialogConfig();
    // Når brugeren trykker uden om dialog, så vil den lukke den ned.
    dialogConfig.disableClose = true;
    this.dialog.open(LoanPropertyDialogComponent, {
      data: {
        userId: this.id,
        componentData: componentData
      }
    });
  }

  goToDetailComponent(element: any) {
    this.router.navigate(["/detailcomponent/" + element]);
  }

  // Kilder: https://www.youtube.com/watch?v=SBz-wHuu4kc & https://www.youtube.com/watch?v=ZhcYPXLGr_E
  // Denne metode bruges til at søge efter specifik komponent.
  componentFilter(filterData: string) {
    // MatTableDataSource som er imported har en propety som filter.
    // Som man kan se er filter tilsluttet til datacomponent, hvor man nu indtaster en værdi på søgefeltet.
    // Så vil den reducere listen.
    this.dataComponents.filter = filterData.trim().toLowerCase();
  }
  deleteLoan(loanId: any) {
    this.router.navigate(["/delete-loan/" + loanId]);
  }
  saveLoanData(data: NgForm) {
    this.loanService.updateLoanData(data, this.id).subscribe(
      res => {},
      error => {});
  }
  deleteReservationData(resevertionId: any) {
    this.router.navigate(["/delete-reservation/" + resevertionId]);
  }
}
