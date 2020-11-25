import { Component, OnInit } from '@angular/core';
import {LoansService} from '../../../Service/LoansService/loans.service';
// Kilder: https://material.angular.io/components/table/overview
// Der er taget inspiration fra dette link, til at oprette en tabel
@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {
  displayedColumns: string[] = ['componentName', 'componentNumber', 'adminComment', 'loanDate','returnDate'];
  loansData;
  constructor(private LoanService:LoansService) { }

  ngOnInit() {
    this.LoanService.getListLoans().subscribe(res=>{
      this.loansData = res;
    });
  }
}
