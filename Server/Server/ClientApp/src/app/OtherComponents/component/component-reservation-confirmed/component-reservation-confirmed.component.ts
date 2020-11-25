import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ReservationService } from "../../../Service/ReservationService/reservation.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-component-reservation-confirmed",
  templateUrl: "./component-reservation-confirmed.component.html",
  styleUrls: ["./component-reservation-confirmed.component.css"],
})
export class ComponentReservationConfirmedComponent implements OnInit {
  constructor(private reservationService: ReservationService, private _location: Location, private activatedRouter: ActivatedRoute) {}
  componentData;
  ngOnInit() {
    this.activatedRouter.params.subscribe((params) => {
      this.reservationService.getReservationConfirmed(params["id"]).subscribe((res) => {
        this.componentData = res;
      });
    });
  }

  backToComponent() {
    this._location.back();
  }
}
