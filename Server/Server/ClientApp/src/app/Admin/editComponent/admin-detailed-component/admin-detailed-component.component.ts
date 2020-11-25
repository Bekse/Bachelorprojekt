import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AdminReservationDialogComponent } from "./admin-reservation-dialog/admin-reservation-dialog.component";
import { NgForm } from "@angular/forms";
import { ComponentService } from 'src/app/Service/ComponentService/component.service';
import { CategoryService } from 'src/app/Service/categoryService/category.service';
@Component({
  selector: "app-admin-detailed-component",
  templateUrl: "./admin-detailed-component.component.html",
  styleUrls: ["./admin-detailed-component.component.css"],
})
export class AdminDetailedComponentComponent implements OnInit {
  constructor(private router: Router, private activatedRouter: ActivatedRoute, private dialog: MatDialog,
    private componentService: ComponentService, private categoryService: CategoryService) {}

  categories
  componentData;
  selected;
  ngOnInit() {
    this.activatedRouter.params.subscribe((params) => {
      this.componentService.getComponentDetail(params["id"]).subscribe((res) => {
        this.categoryService.getAllCategories().subscribe(res => {
          this.categories = res;
        })
        this.componentData = res;
      });
    });
  }

  goToAdminComponentList() {
    this.router.navigate(["/admin-components-list"]);
  }

  reserveAdminComponent(componentId: any, componentName: any) {
    const dialogConfig = new MatDialogConfig();
    // Når brugeren trykker uden om dialog, så vil den lukke den ned.
    dialogConfig.disableClose = true;
    this.dialog.open(AdminReservationDialogComponent, {
      data: {
        componentId: componentId,
        componentName: componentName,
      },
    });
  }

  adminDeleteComponent(componentId: any) {
    this.router.navigate(["/delete-component/" + componentId]);
  }

  detailedDataEdit(data: NgForm) {
    if (data.value.categoryName == null) {
      data.value.categoryName = this.componentData.categoryName;
    }
    this.componentService.updateDetailedComponent(data.value, this.componentData.componentId).subscribe((res) => {
      this.componentData.categoryName = data.value.categoryName;
      this.selected = 'categoryValue';
    });
  }
}
