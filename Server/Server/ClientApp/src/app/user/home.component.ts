import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../Service/UserService/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }  
  visible: boolean;


  ngOnInit(){
  this.visible = this.userService.loggedin();

    if(this.userService.loggedin()){
      this.router.navigateByUrl('/');
  }

}
}