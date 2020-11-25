import { Component, OnInit, Inject } from "@angular/core";
import { UserService } from "../../../Service/UserService/user.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";

// Kilder: https://material.angular.io/components/dialog/overview

@Component({
  selector: 'app-delete-profil-dialog',
  templateUrl: './delete-profil-dialog.component.html',
  styleUrls: ['./delete-profil-dialog.component.css']
})
export class DeleteProfilDialogComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, public dialogRef: MatDialogRef<DeleteProfilDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  deleteUser() {
    this.userService.deleteUser().subscribe(res => {
      this.userService.deleteToken();
      this.router.navigate(['/']);
      window.location.reload();   
     },error=>{}
     );
  }
}
