import { Injectable } from "@angular/core";
import { Rental } from "src/app/models/rental.model";
import { Category } from "../models/category.enum";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class RentalService {
  private rentals: Rental[] = [];

  constructor(private http: HttpClient) {}

  getRental(id: string | number) {
    return this.http.get(`/api/v1/rentals/${id}`);
  }

  getRentals() {
    return this.http.get("/api/v1/rentals/");
  }
}
