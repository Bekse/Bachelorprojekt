import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from "../../../Service/AdminService/admin.service";
import { Location } from "@angular/common";
import { ComponentService } from '../../../Service/ComponentService/component.service';
@Component({
  selector: 'app-delete-component',
  templateUrl: './delete-component.component.html',
  styleUrls: ['./delete-component.component.css']
})
export class DeleteComponentComponent implements OnInit {

  constructor(private componentService: ComponentService, private activatedRouter: ActivatedRoute,
    private _location: Location, private router:Router) { }
    componentData;
  ngOnInit() {
    this.activatedRouter.params.subscribe((params) => {
      this.componentService.getComponentDetail(params["id"]).subscribe((res) => {
        this.componentData = res;
        console.log(res);
      });
    });
  }

  backToPreviousPage(){
    this._location.back();

  }
  deleteComponent(componentId:any){
    this.componentService.deleteComponent(componentId).subscribe(res => {
      this.router.navigate(["/admin"]);
    }); 
  }
}
