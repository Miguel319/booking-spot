import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RentalListComponent } from "../../components/rental/rental-list/rental-list.component";
import { RentalItemComponent } from "../../components/rental/rental-item/rental-item.component";
import { RentalComponent } from "../../components/rental/rental.component";
import { Routes, RouterModule } from "@angular/router";
import { RentalDetailsComponent } from "../../components/rental/rental-details/rental-details.component";

const routes: Routes = [
  { path: "rentals", component: RentalComponent },
  { path: "rentals/:rentalId", component: RentalDetailsComponent }
];
@NgModule({
  declarations: [
    RentalListComponent,
    RentalItemComponent,
    RentalComponent,
    RentalDetailsComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RentalListComponent, RentalItemComponent, RentalComponent]
})
export class RentalModule {}
