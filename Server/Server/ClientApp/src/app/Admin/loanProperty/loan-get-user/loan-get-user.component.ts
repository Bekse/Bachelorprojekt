import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UserService } from 'src/app/Service/UserService/user.service';

@Component({
  selector: 'app-loan-get-user',
  templateUrl: './loan-get-user.component.html',
  styleUrls: ['./loan-get-user.component.css']
})
export class LoanGetUserComponent implements OnInit {
  constructor(private userService:UserService, private router: Router) { }
  userData;

  ngOnInit(): void {
  }
  goToAdminPage(){
    this.router.navigate(["/admin"]);
  }

  searchUser(auID:NgForm){
    this.userService.getUsers(auID.value).subscribe(res=>{
      this.userData = res;
      this.router.navigate(["/loan-property/"+this.userData.id])
    });
  }
}
