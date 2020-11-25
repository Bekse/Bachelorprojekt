import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class LoansService {

  constructor(private http: HttpClient) { }
  // Get() metoder
  getListLoans(){
    return this.http.get(environment.apiURL+"/loans");
  }

  getLoan(loanId:any){
    return this.http.get(environment.apiURL+"/loans/"+loanId);

  }
  getLoanReservationList(userId:any){
    return this.http.get(environment.apiURL+"/collections/"+userId);
  }

  // Post() metode
  postLoan(userId:any,componentId:any){
    return this.http.post(environment.apiURL+"/loans/"+userId,componentId);
  }

  // Put() methode
  updateLoanData(loanData:any,userId:any){
    return this.http.put(environment.apiURL+"/loans/"+userId,loanData);

  }
  
  // Delete() metode
  deleteLoanData(loanID:any){
    return this.http.delete(environment.apiURL+"/loans/"+loanID);
  }


}
