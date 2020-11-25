import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
// Gør brug af NgForm, da den automatisk tilføjer alle form (tags) i angular template.
import { NgForm } from '@angular/forms';
import { ComponentService } from 'src/app/Service/ComponentService/component.service';
import { CategoryService } from 'src/app/Service/categoryService/category.service';

@Component({
  selector: 'app-post-component',
  templateUrl: './post-component.component.html',
  styleUrls: ['./post-component.component.css']
})
export class PostComponentComponent implements OnInit {
  constructor(private router: Router, private componentService: ComponentService, private category: CategoryService) {}
  categories;

  ngOnInit() {
    this.category.getAllCategories().subscribe(res => {
      this.categories = res;
    })
  }

  backToAdminPage() {
    this.router.navigate(["/admin"]);
  }

  postComponent(data: NgForm) {
    this.componentService.postComponent(data.value).subscribe(res => {
      this.router.navigate(["/admin"]);
    });
  }
}
