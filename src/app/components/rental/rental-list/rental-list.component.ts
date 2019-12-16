import { Component, OnInit, Input } from "@angular/core";
import { Rental } from "../../../models/rental.model";
import { Category } from "src/app/models/category.enum";
import { RentalService } from '../../../services/rental.service';

@Component({
  selector: "app-rental-list",
  templateUrl: "./rental-list.component.html",
  styleUrls: ["./rental-list.component.scss"]
})
export class RentalListComponent implements OnInit {
  rentals: Rental[] = [];

  constructor(private rentalService: RentalService) {}

  ngOnInit() {
    this.rentals =this.rentalService.getRentals();
  }
}
