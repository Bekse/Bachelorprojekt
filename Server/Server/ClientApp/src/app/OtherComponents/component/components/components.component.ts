import { Component, OnInit } from '@angular/core';
import {ComponentService} from '../../../Service/ComponentService/component.service';
import {ReservationDialogComponent} from './reservation-dialog/reservation-dialog.component';
import { Router } from "@angular/router";
import { MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatTableDataSource} from '@angular/material/table';
import { CategoryService } from 'src/app/Service/categoryService/category.service';
// Kilder: https://material.angular.io/components/table/overview
// Der er taget inspiration fra dette link, til at oprette en tabel
@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {
  constructor(private componentService: ComponentService, private router: Router, private dialog: MatDialog, private categoryService: CategoryService) {}
  displayedColumns: string[] = ['componentImage', 'componentName', 'componentInfo', 'componentAvailable', 'D/R'];
  categories;
  dataComponents;
  data;

  ngOnInit() {
    this.componentService.getComponents().subscribe(res => {
      // Laver en instance af datacomponent af MatTableDataSource.
      this.dataComponents = new MatTableDataSource( < any > res);
    }
    
    );
    this.categoryService.getAllCategories().subscribe(res => {
      this.categories = res;
    });
  }

  selectedCategory(categoryIdValue: any) {
    if (categoryIdValue.value != null) {
      this.categoryService.getCategorySpecificComponentData(categoryIdValue.value).subscribe(res => {
        this.dataComponents = res;
      });
    } else {
      // Hvis man taster "none" ved filter, så bliver else køret, hvor den hente alle komponenter.
      this.componentService.getComponents().subscribe(res => {
        // Laver en instance af datacomponent af MatTableDataSource.
        this.dataComponents = new MatTableDataSource( < any > res);
      });
    }
  }

  goToDetailComponent(componentId: any) {
    this.router.navigate(["/detailcomponent/" + componentId]);
  }

  // kilder: https://www.youtube.com/watch?v=ZL0d3M3uoRQ
  reserveComponent(componentId: any, componentName: any) {
    const dialogConfig = new MatDialogConfig();
    // Når brugeren trykker uden om dialog, så vil den lukke den ned.
    dialogConfig.disableClose = true;
    this.dialog.open(ReservationDialogComponent, {
      data: {
        componentId: componentId,
        componentName: componentName
      }
    });
  }

  // Kilder: https://www.youtube.com/watch?v=SBz-wHuu4kc & https://www.youtube.com/watch?v=ZhcYPXLGr_E
  // Denne metode bruges til at søge efter specifik komponent.
  componentFilter(filterData: string) {
    // MatTableDataSource som er imported har en propety som filter.
    // Som man kan se er filter tilsluttet til datacomponent, hvor man nu indtaster en værdi på søgefeltet.
    // Så vil den reducere listen.
    this.dataComponents.filter = filterData.trim().toLowerCase();
  }
}
