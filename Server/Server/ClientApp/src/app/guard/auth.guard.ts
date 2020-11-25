import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot} from "@angular/router";
import { UserService } from "../Service/UserService/user.service";

@Injectable({
  providedIn: "root"
})
// Kilder https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3
// kilder: https://www.youtube.com/watch?v=7L80dKtfHe0
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  payloadData;
  // Her tjekker brugeren stadige har token ellers bliver brugeren henvist til login-siden.
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data;


    this.payloadData = this.userService.getUserpayload();

    //if (!this.userService.isLoggedIn()) {
      // Denne if - statement tjekker for brugeren har det rette rolle, eller bliver der henvist til start-siden.
    if (!(this.payloadData.role == expectedRole.expectedRoleAdmin||
      this.payloadData.role == expectedRole.expectedRoleClerk||
      this.payloadData.role== expectedRole.expectedRoleStudent||
      this.payloadData.role == expectedRole.expectedRoleStaff)) 
      {
      this.router.navigate(["/"]);
      return false;
    } else {
      return true;
    }
  }
}
