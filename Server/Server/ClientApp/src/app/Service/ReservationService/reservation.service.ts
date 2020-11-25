import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Reservation } from "./reservation.model";
import { AdminReservation } from '../AdminService/admin-reservation.model';

@Injectable({
  providedIn: 'root'
})


export class ReservationService {

  constructor(private http: HttpClient) {}
  // get() metoder
  getReservationConfirmed(id: any) {
    return this.http.get(environment.apiURL + "/Reservations/" + id);
  }

  getListReservation() {
    return this.http.get(environment.apiURL + '/Reservations');

  }

  // post() metoder
  // Denne metode sender en POST request til severen med komponentId, for at kunne resevere en komponent.
  reserveComponent(componentId: Reservation) {
    return this.http.post(environment.apiURL + "/Reservations", {componentId});
  }
  // Denne metode sender en POST request til severen med komponentId, for at kunne resevere en komponent.
  adminReserveComponent(componentId: AdminReservation) {
    return this.http.post(environment.apiURL + "/Reservations", {componentId});
  }

  // delete() metode
  deleteReservation(reservationId: any) {
    return this.http.delete(environment.apiURL + '/Reservations/' + reservationId);
  }
}
