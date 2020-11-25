import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LoansService} from "../../../Service/LoansService/loans.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: 'app-delete-loan',
  templateUrl: './delete-loan.component.html',
  styleUrls: ['./delete-loan.component.css']
})
export class DeleteLoanComponent implements OnInit {

  constructor(private activatedRouter: ActivatedRoute, private myLoanService: LoansService,private location: Location) { }
  loanDataToBeDeleted;

  ngOnInit(){
    this.activatedRouter.params.subscribe(params => {
      this.myLoanService.getLoan(params['id']).subscribe(res=>{
        this.loanDataToBeDeleted = res;
      });
    });
  }

  backToPreviousPage(){
    this.location.back();

  }
  deleteLoan(loanId:any){
    this.myLoanService.deleteLoanData(loanId).subscribe(res => {
      this.location.back();
    }); 
  }
}
