import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RentalModule } from "./modules/rental/rental.module";
import { RentalComponent } from "./components/rental/rental.component";

const routes: Routes = [
  { path: "", redirectTo: "/rentals", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RentalModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
