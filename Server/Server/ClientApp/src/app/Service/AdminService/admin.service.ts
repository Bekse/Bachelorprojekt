import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  constructor(private http: HttpClient) {}
  AuthHeader = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  postUser(userData:any){
    return this.http.post(environment.apiURL+"/admin",userData);
  }


  getAllUserData(userID:any){
    return this.http.get(environment.apiURL+"/admin/"+userID);
  }

  updateUser(userData:any,userID:any){
    return this.http.put(environment.apiURL+"/admin/"+userID,userData);
  }

  deleteUser(userId:any){
    return this.http.delete(environment.apiURL+"/Admin/"+userId);
  }

}
