import { Component, OnInit } from '@angular/core';
import { UserService } from "../Service/UserService/user.service";
import { Router } from "@angular/router";
// Der er taget inspiration til navbar.component.(ts/html) fra de kilder som ses her:
// Kilder: https://loiane.com/2017/08/angular-hide-navbar-login-page/
// Kilder: https://stackoverflow.com/questions/43118592/angular-2-how-to-hide-nav-bar-in-some-components
// Kilder: https://www.angularjswiki.com/angular/understanding-angulars-ngif-else-then-with-examples/

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {}
  // De her variabler bruges til at gør knapperne usynlig,
  // så bruger som ikke har rettigheder, vil ikke være istand til at kunne se de knapper.
  visible: boolean;
  adminVisible: boolean;

  buttonNameChange;
  payloadData;
  ngOnInit() {
    // Der gør brug af loggedin() method fra servicen, for at se om brugeren er logged ind.
    // Hvis brugeren er logget ind, så vil den ikke vise login og register buttons ved navbar, men istedet vise logout knappen.
    // ved html vil så gør brug af visible variable, ved at se om den er true eller false.
    this.buttonNameChange = false;
    this.visible = this.userService.loggedin();
    if (this.userService.isLoggedIn()) {
      this.payloadData = this.userService.getUserpayload();
      if (this.payloadData.role == "Student" || this.payloadData.role == "Staff") {
        this.adminVisible = false;
      } else {
        if (this.payloadData.role == "Clerk") {
          this.buttonNameChange = true;
        }
        this.adminVisible = true;
      }
    }

    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/']);
    window.location.reload();
  }
}
