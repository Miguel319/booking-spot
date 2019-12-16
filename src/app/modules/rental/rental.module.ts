import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RentalListComponent } from "../../components/rental/rental-list/rental-list.component";
import { RentalItemComponent } from "../../components/rental/rental-item/rental-item.component";
import { RentalComponent } from "../../components/rental/rental.component";

@NgModule({
  declarations: [RentalListComponent, RentalItemComponent, RentalComponent],
  imports: [CommonModule],
  exports: [RentalListComponent, RentalItemComponent, RentalComponent]
})
export class RentalModule {}
