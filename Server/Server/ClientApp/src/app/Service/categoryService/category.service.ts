import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  // Get() metoder
  getAllCategories(){
    return this.http.get(environment.apiURL+"/categories");
  }
  getCategorySpecificComponentData(categoryId:any){
    return this.http.get(environment.apiURL+"/Categories/"+categoryId);
  }

  // Post() metode
  postCategory(categoryName:any){
    return this.http.post(environment.apiURL+"/Categories",categoryName);

  }
  updateCategory(categoryId:any,categoryData:any){
    return this.http.put(environment.apiURL+"/categories/"+categoryId,categoryData);

  }

  // Delete() metode
  deleteSpecificCategory(categoryId:any){
    return this.http.delete(environment.apiURL+"/categories/"+categoryId);
  }
}
