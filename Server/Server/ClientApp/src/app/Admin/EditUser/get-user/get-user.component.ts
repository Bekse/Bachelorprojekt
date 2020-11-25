import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../Service/AdminService/admin.service';
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UserService } from 'src/app/Service/UserService/user.service';

@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.css']
})
export class GetUserComponent implements OnInit {
  displayedColumns: string[] = ['firstName','lastName','auId', 'studentNumber','Edit'];

  constructor(private router: Router,private userService:UserService) { }
  userData;
  ngOnInit() {

  }

    goToAdminPage(){
      this.router.navigate(["/admin"]);
    }

    searchUser(auID:NgForm){
      this.userService.getUsers(auID.value).subscribe(res=>{

        this.userData = res;
        this.router.navigate(["/admin-edit-user/"+this.userData.id])
      });
    }
    
}
