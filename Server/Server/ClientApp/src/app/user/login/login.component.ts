import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UserService } from '../../Service/UserService/user.service'

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  serverError: string;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/');
    }
  }

  userLogin(userLoginData: NgForm) {
    this.userService.login(userLoginData.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/');
        window.location.reload();

      },
      err => {
        if (err.status == 500) {
          this.serverError = "Serveren fungerer ikke";
        }
        if (err.status == 0) {
          this.serverError = "Serveren er ikke tilgængelig";
        }
        if (err.status == 400) {
          this.serverError = "Udfyld venligst både auID og password";
        } else {
          this.serverError = "Ukendt Fejl, kontakt admin"
        }
      }
    );
  }
  goToRegister() {
    this.router.navigate(["/register"]);
  }
}
