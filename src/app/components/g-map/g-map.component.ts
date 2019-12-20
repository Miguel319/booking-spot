import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { GMapService } from "../../services/g-map.service";

@Component({
  selector: "app-g-map",
  templateUrl: "./g-map.component.html",
  styleUrls: ["./g-map.component.scss"]
})
export class GMapComponent implements OnInit {
  @Input() location: string;
  lat: number;
  lng: number;
  errLocation: boolean = false;

  constructor(
    private gMapService: GMapService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  mapReadyHandler() {
    this.gMapService.getGeoLocation(this.location).subscribe(
      coordinates => {
        this.ref.detectChanges();
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;
      },
      () => (this.errLocation = true)
    );
  }
}
