import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { RentalModule } from "./modules/rental/rental.module";
import { CameItPipe } from "./pipes/came-it.pipe";
import { AuthModule } from "./modules/auth/auth.module";


@NgModule({
  declarations: [AppComponent, NavbarComponent, CameItPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RentalModule,
    HttpClientModule,
    AuthModule,
  ],
  providers: [CameItPipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
