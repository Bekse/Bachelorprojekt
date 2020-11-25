import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from '../../Service/UserService/user.service';
@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}
  payloadData;
  loanVisible;
  restVisible;
  buttonNameChange;
  ngOnInit() {
    this.payloadData = this.userService.getUserpayload();
 
    this.restVisible = false;
    this.buttonNameChange = false;
    this.loanVisible = false;
    if (this.payloadData.role == "Clerk") {
      this.loanVisible = true;
      this.buttonNameChange = true;
    }

    if (this.payloadData.role == "Admin") {
      this.restVisible = true;
      this.loanVisible = true;
    }
  }
  goToPostComponent() {
    this.router.navigate(["/create-component"]);
  }
  goToDeleteEditComponent() {
    this.router.navigate(["/admin-components-list"]);
  }
  goToGetUser() {
    this.router.navigate(["/admin-get-user"]);
  }
  goToCreateUser() {
    this.router.navigate(["admin-create-user"]);
  }
  goToLoans() {
    this.router.navigate(["/loan-get-user"]);
  }
  goToCreateCategories() {
    this.router.navigate(["/create-categories"]);
  }
}
