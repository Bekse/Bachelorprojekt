import { Component, OnInit } from '@angular/core';
import {ComponentService} from '../../../Service/ComponentService/component.service';
import {ActivatedRoute} from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-detail-component',
  templateUrl: './detail-component.component.html',
  styleUrls: ['./detail-component.component.css']
})
export class DetailComponentComponent implements OnInit {

  constructor(private componentService: ComponentService, private activatedRouter: ActivatedRoute,
    private _location: Location) {}
  componentData;
  categoryData;

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      this.componentService.getComponentDetail(params['id']).subscribe(res => {
        this.categoryData = res;
        this.componentData = res;
      });
    });
  }

  goToComponents() {
    this._location.back();
  }
}
