import { Injectable } from '@angular/core';
import { Rental } from 'src/app/models/rental.model';
import { Category } from '../models/category.enum';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  rentals: Rental[];

  constructor() { }

  getRentals(): Rental[] {
      const rental1 = new Rental({
        id: 1,
        title: "Central Apartment 2",
        city: "New York",
        street: "Times Square",
        category: Category.Apartament,
        image: "http://via.placehold.com/350x250",
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
        image: "http://via.placehold.com/350x250",
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
        image: "http://via.placehold.com/350x250",
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
        image: "http://via.placehold.com/350x250",
        bedrooms: 3,
        description: "Very nice apartment",
        dailyRate: 34,
        shared: false
      });

      this.rentals.push(rental1, rental2, rental3, rental4);

    return this.rentals;
  }
  
}
