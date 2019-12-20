import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RentalService } from "../../../services/rental.service";
import { Rental } from "../../../models/rental.model";

@Component({
  selector: "app-rental-details",
  templateUrl: "./rental-details.component.html",
  styleUrls: ["./rental-details.component.scss"]
})
export class RentalDetailsComponent implements OnInit {
  currentParam: string = "";
  rental: Rental = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private rentalS: RentalService
  ) {}

  ngOnInit() {
    this.getDetails();
  }

  getDetails() {
    const id = this.activatedRoute.snapshot.paramMap.get("rentalId");

    this.rentalS.getRental(id).subscribe(
      (res: Rental) => {
        this.rental = res;
        console.log(res);
      },
      err => console.log(err)
    );
  }
}
