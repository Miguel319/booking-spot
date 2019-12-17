import { Injectable } from "@angular/core";
import { Rental } from "src/app/models/rental.model";
import { Category } from "../models/category.enum";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RentalService {
  private rentals: Rental[] = [];

  constructor() {
    this.rentals = [...this.createList()];
  }

  private createList(): Rental[] {
    const rental1 = new Rental({
      id: 1,
      title: "Central Apartment 2",
      city: "New York",
      street: "Times Square",
      category: Category.Apartament,
      image: "http://via.placeholder.com/350x250",
      bedrooms: 3,
      description: "Very nice apartment",
      dailyRate: 34,
      shared: false
    });

    const rental2 = new Rental({
      id: 2,
      title: "Central Apartment 1",
      city: "Berlin",
      street: "Haupt Strasse",
      category: Category.Apartament,
      image: "http://via.placeholder.com/350x250",
      bedrooms: 9,
      description: "Very nice apartment",
      dailyRate: 33,
      shared: true
    });
    const rental3 = new Rental({
      id: 3,
      title: "hELLO",
      city: "New York",
      street: "Times Square",
      category: Category.Apartament,
      image: "http://via.placeholder.com/350x250",
      bedrooms: 3,
      description: "Very nice apartment",
      dailyRate: 34,
      shared: false
    });
    const rental4 = new Rental({
      id: 4,
      title: "HellO wORLD",
      city: "New York",
      street: "Times Square",
      category: Category.Apartament,
      image: "http://via.placeholder.com/350x250",
      bedrooms: 3,
      description: "Very nice apartment",
      dailyRate: 34,
      shared: false
    });

    return [rental1, rental2, rental3, rental4];
  }

  getRentals(): Observable<Rental[]> {
    const rentalObservable: Observable<Rental[]> = new Observable(ob => {
      if (this.rentals) {
        ob.next(this.rentals);
      } else {
        ob.error("Could not get rentals. Please, try again.");
      }
    });
    return rentalObservable;
  }

  getRental(id: number | string): Observable<Rental> {
    const rental: Rental = this.rentals.find(v => v.id === id);

    const mRental: Observable<Rental> = new Observable(ob => {
      if (rental) {
        ob.next(rental);
      } else {
        ob.error("There aren't rentals with that id");
      }
    });
    return mRental;
  }
}
