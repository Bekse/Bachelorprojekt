import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";
import { UserService } from "../Service/UserService/user.service";

@Injectable({
  providedIn: "root"
})

// kilder https://www.youtube.com/watch?v=UrfhqE7I-3o
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}
  // Her sætter man token i Http header, som bliver sendt til serveren.
  intercept(req, next) {
    let userService = this.injector.get(UserService);
    let token = req.clone({
      setHeaders: {
        Authorization: `Bearer ${userService.getToken()}`
      }
    });
    return next.handle(token);
  }
}
