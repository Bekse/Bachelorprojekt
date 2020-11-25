import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UserService } from "../../Service/UserService/user.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  serverError: string;
  
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {    
    if(this.userService.loggedin()){
    this.router.navigateByUrl('/');
  }}

  registerUser(userData: NgForm) {
    // Sender værdien videre til service, hvis den returner error, så vil den udskrive det til brugeren. Ellers henviser den til login siden.
    // Kilder: https://angular.io/tutorial/toh-pt4#subscribe-in-heroescomponent
    this.userService.postUser(userData.value).subscribe(
      res => {
        this.router.navigateByUrl("/login");
      },
      err => {
        if(err.status== 500)
        {
          this.serverError = "Serveren fungerer ikke";
        }
        if(err.status == 0)
        {
          this.serverError = "Serveren er ikke tilgængelig";
        }
        if(err.status == 400)
        {
          this.serverError = "Udfyld venligst alle felter!";
        }
        else{
          this.serverError = "Ukendt Fejl, kontakt admin"
        }
      }
    );
  }
  getErrorMessage() {
    return "You must enter a value";
  }
  // Her under ses der en metode, når den bliver køret, så vil den henvise til login-siden.
  //Kilder: https://alligator.io/angular/navigation-routerlink-navigate-navigatebyurl/
  goToLogin() {
    // Her under bliver der brugt metoden-navigate fra Router-class.
    this.router.navigate(["/login"]);
  }
}
