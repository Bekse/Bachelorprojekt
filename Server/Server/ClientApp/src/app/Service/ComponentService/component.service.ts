import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  constructor(private http: HttpClient) { }

  // Get() metoder
  getComponentDetail(id:any){
    return this.http.get(environment.apiURL + "/Components/"+id);
  }

  getComponents(){
    return this.http.get(environment.apiURL + '/Components');

  }
  // Post() metode
  postComponent(componentData: any) {
    return this.http.post(environment.apiURL + "/Components", componentData);
  }

  // Put() metode
  updateDetailedComponent(componentData: any, componentId: any) {
    componentData.componentId = componentId;
    return this.http.put(environment.apiURL + "/Components/" + componentId, componentData);
  }

  // Delete() metode
  deleteComponent(componentId:any){
    return this.http.delete(environment.apiURL+"/components/"+componentId)
  }


}
