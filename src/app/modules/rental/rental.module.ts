import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RentalListComponent } from "../../components/rental/rental-list/rental-list.component";
import { RentalItemComponent } from "../../components/rental/rental-item/rental-item.component";
import { RentalComponent } from "../../components/rental/rental.component";
import { Routes, RouterModule } from "@angular/router";
import { RentalDetailsComponent } from "../../components/rental/rental-details/rental-details.component";
import { GMapModule } from "../g-map/g-map.module";
import { CameItPipe } from "src/app/pipes/came-it.pipe";
import { AuthGuard } from "src/app/guards/auth.guard";

const routes: Routes = [
  {
    path: "rentals",
    component: RentalComponent,
    children: [
      { path: "", component: RentalListComponent },
      {
        path: ":rentalId",
        component: RentalDetailsComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];
@NgModule({
  declarations: [
    RentalListComponent,
    RentalItemComponent,
    RentalComponent,
    RentalDetailsComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes), GMapModule],
  exports: [
    RentalListComponent,
    RentalItemComponent,
    RentalComponent,
    RentalDetailsComponent
  ]
})
export class RentalModule {}
