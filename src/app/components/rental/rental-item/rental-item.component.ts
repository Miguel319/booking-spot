import { Component, OnInit, Input } from "@angular/core";
import { Rental } from "src/app/models/rental.model";
import { Router } from '@angular/router';

@Component({
  selector: "app-rental-item",
  templateUrl: "./rental-item.component.html",
  styleUrls: ["./rental-item.component.scss"]
})
export class RentalItemComponent implements OnInit {
  @Input() rental: Rental;

  constructor(private router: Router) {}

  ngOnInit() {}

  seeDetails() {
    this.router.navigateByUrl(`/rentals/${this.rental.id}`);
  }

}
