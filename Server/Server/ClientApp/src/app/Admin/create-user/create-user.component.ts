import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from "../../Service/AdminService/admin.service";
import { Router } from "@angular/router";

interface Role {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  constructor(private router: Router, private adminService: AdminService) {}

  roles: Role[] = [
    {value: 'Admin', viewValue: 'Admin'},
    {value: 'Staff', viewValue: 'Staff'},
    {value: 'Clerk', viewValue: 'Clerk'},
    {value: 'Student', viewValue: 'Student'}
  ];

  ngOnInit(): void {}

  postComponent(data: NgForm) {
    this.adminService.postUser(data.value).subscribe(res => {
      this.router.navigate(["/admin"]);
    })
  }
  backToAdminPage() {
    this.router.navigate(["/admin"]);
  }
}
