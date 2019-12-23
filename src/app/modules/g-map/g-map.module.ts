import { NgModule } from "@angular/core";
import { GMapComponent } from "../../components/g-map/g-map.component";
import { GOOGLE_API_KEY } from "../../keys/keys";
import { AgmCoreModule } from "@agm/core";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [GMapComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: GOOGLE_API_KEY
    })
  ],
  exports: [GMapComponent]
})
export class GMapModule {}
