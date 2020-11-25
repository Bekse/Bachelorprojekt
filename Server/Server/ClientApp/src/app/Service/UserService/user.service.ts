import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: "root"
})
export class UserService {
  static isLoggedIn() {
    throw new Error("Method not implemented.");
  }
  // Kilder: https://angular.io/guide/http#http-headers

  constructor(private http: HttpClient) {}
  // get() metoder
  getUser() {
    return this.http.get(environment.apiURL + "/users/");
  }

  getUsers(userID: any) {
    return this.http.get(environment.apiURL + "/users/" + userID.auId);
  }

  // post() metoder
  login(loginData) {
    return this.http.post(environment.apiURL + '/login', loginData);
  }


  postUser(user: User) {
    return this.http.post(environment.apiURL + '/register', user);
  }

  // put() methode
  updateUserProfil(user: User) {
    return this.http.put(environment.apiURL + "/users", user);
  }
  // delete() methode
  deleteUser() {
    return this.http.delete(environment.apiURL + "/users");
  }

  // Token get()/set() metoder.
  // Henter token fra localstorage i browseren.
  getToken() {
    return localStorage.getItem('token');
  }
  // denne metode gemmer token i localstorage i browseren.
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Used to remove token, so user can logout.
  deleteToken() {
    localStorage.removeItem('token');
  }

  // Hvis der er token i localstorage, som er i browseren, så vil den retunere true ellers false.
  loggedin() {
    return !!localStorage.getItem("token");
  }

  // Denne metoder henter payload fra getToken(), hvis der er token,
  // så vil den gør brug af JSON.parse(), for at lave det om til javescriptObject.
  getUserpayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else
      return null;
  }
  // Denne metode bruges til at se om userPayload er stadige gyldig.
  isLoggedIn() {
    var userPayload = this.getUserpayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
  }
}
