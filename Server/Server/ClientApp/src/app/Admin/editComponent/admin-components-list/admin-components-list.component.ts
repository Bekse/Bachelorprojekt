import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {MatTableDataSource} from '@angular/material/table';
import { ComponentService } from 'src/app/Service/ComponentService/component.service';
// Kilder: https://material.angular.io/components/table/overview
// Der er taget inspiration fra dette link, til at oprette en tabel
@Component({
  selector: 'app-admin-components-list',
  templateUrl: './admin-components-list.component.html',
  styleUrls: ['./admin-components-list.component.css']
})
export class AdminComponentsListComponent implements OnInit {
  constructor(private componentService: ComponentService, private router: Router) {}
  displayedColumns: string[] = ['componentImage', 'componentName', 'componentInfo', 'componentStatus', 'D/E'];
  dataComponents;

  ngOnInit() {
    this.componentService.getComponents().subscribe(res => {
      // Laver en instance af datacomponent af MatTableDataSource.
      this.dataComponents = new MatTableDataSource( < any > res);
    });
  }

  goToDetailComponent(element: any) {
    this.router.navigate(["/admin-detailed-component/" + element]);
  }

  // Kilder: https://www.youtube.com/watch?v=SBz-wHuu4kc & https://www.youtube.com/watch?v=ZhcYPXLGr_E
  // Denne metode bruges til at søge efter specifik komponent.
  componentFilter(filterData: string) {
    // MatTableDataSource som er imported har en propety som filter.
    // Som man kan se er filter tilsluttet til datacomponent, hvor man nu indtaster en værdi på søgefeltet.
    // Så vil den reducere listen.
    this.dataComponents.filter = filterData.trim().toLowerCase();
  }
  goToAdminPage() {
    this.router.navigate(["/admin"]);
  }
}
