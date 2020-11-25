import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Service/UserService/user.service';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { DeleteProfilDialogComponent } from './delete-profil-dialog/delete-profil-dialog.component';
// Kilder: https://material.angular.io/components/dialog/overview
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  constructor(private userService: UserService, private router: Router, private dialog: MatDialog) {}
  serverError;
  userData;
  ngOnInit() {
    this.userService.getUser().subscribe(res => {
      this.userData = res;
    });
  }

  saveUser(userDataForm: NgForm) {
    this.userService.updateUserProfil(userDataForm.value).subscribe(res => {
      this.router.navigate(["/"]);
    },error =>{
      this.serverError = "Server fejl, kontakt admin!";
    })
  }
  errorMSg(){
    this.serverError = "You have loaned a component!"
  }
  cancelButton() {
    this.router.navigate(["/"]);
  }
  // kilder: https://www.youtube.com/watch?v=ZL0d3M3uoRQ
  deleteProfil() {
    const dialogConfig = new MatDialogConfig();
    // Når brugeren trykker uden om dialog, så vil den lukke den ned.
    dialogConfig.disableClose = true;
    this.dialog.open(DeleteProfilDialogComponent);
  }
}
