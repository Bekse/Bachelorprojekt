import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from "../../../Service/AdminService/admin.service";
import { NgForm } from "@angular/forms";
import {LoansService} from '../../../Service/LoansService/loans.service';
interface Role {
  value: string;
  viewValue: string;
}
// Kilder: https://material.angular.io/components/table/overview
// Der er taget inspiration fra dette link, til at oprette en tabel
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})


export class EditUserComponent implements OnInit {
  constructor(private adminService: AdminService, private router: Router,private activatedRouter: ActivatedRoute, private loanService:LoansService) { }
  displayedColumns: string[] = ['componentName','componentNo','adminComment', 'reservedDate','delete'];
  loanDisplayedColumns: string[] = ['componentName','componentNo','adminComment','loanDate','returnDate','delete'];
  userData;
  id;
  reservations;
  editUserLoans;

  roles: Role[] = [
    {value: 'Admin', viewValue: 'Admin'},
    {value: 'Staff', viewValue: 'Staff'},
    {value: 'Clerk', viewValue: 'Clerk'},
    {value: 'Student', viewValue: 'Student'}
  ];

  ngOnInit() {
    this.activatedRouter.params.subscribe((params) => {
      this.adminService.getAllUserData(params["id"]).subscribe((res) => {
        this.userData = res;
        this.reservations = this.userData.reservations;
        this.editUserLoans = this.userData.loans;
        this.id=params["id"];
      });
    });
  }
  deleteUser(){
    this.adminService.deleteUser(this.id).subscribe(res=> {
      this.router.navigate(["/admin"]);
    })
  }

  goToUserListPage(){
    this.router.navigate(["/admin-get-user"]);
  }
  userDataEdit(userData:NgForm){
    if (userData.value.role == null) {
      userData.value.role = this.userData.role;
    }
    console.log(this.userData);
    this.adminService.updateUser(userData.value,this.id).subscribe(res=> {
      window.location.reload();
    });
  }
  deleteReservationData(resevertionId:any){
    this.router.navigate(["/delete-reservation/"+resevertionId]);
  }
  deleteLoan(loanId:NgForm){
    this.router.navigate(["/delete-loan/"+loanId]);
  }
  saveLoanData(form:NgForm){
    this.loanService.updateLoanData(form,this.id).subscribe(res=>{});
  }
}
