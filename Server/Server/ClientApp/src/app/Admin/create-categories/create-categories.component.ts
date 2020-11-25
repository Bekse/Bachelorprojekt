import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
// Gør brug af NgForm, da den automatisk tilføjer alle form (tags) i angular template.
import { NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/Service/categoryService/category.service';
// Kilder: https://material.angular.io/components/table/overview
// Der er taget inspiration fra dette link, til at oprette en tabel
@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.css']
})

export class CreateCategoriesComponent implements OnInit {
  constructor(private router: Router, private categoryService: CategoryService) {}
  categoryDisplayedColumns: string[] = ['categoryName', 'D/E'];
  categoriesData;
  deleteCategoryError;
  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(res => {
      this.categoriesData = res;
    })
  }

  backToAdminPage() {
    this.router.navigate(["/admin"]);
  }

  postCategory(categoriesName: NgForm) {
    this.categoryService.postCategory(categoriesName.value).subscribe(res => {
      this.router.navigate(["/admin"]);
    }, error => {})
  }

  editCategory(categoryData: any) {
    this.categoryService.updateCategory(categoryData.categoryId, categoryData).subscribe(res => {
      window.location.reload();
    }), error => {}
  }

  deleteCategory(cateogryId: any) {
    this.categoryService.deleteSpecificCategory(cateogryId).subscribe(res => {
        window.location.reload();
      },
      err => {
        this.deleteCategoryError = "This category contains component. Delete the component first!";
      })
  }
}
