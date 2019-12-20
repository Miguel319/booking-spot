import { Injectable } from "@angular/core";
import { CameItPipe } from "../pipes/came-it.pipe";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GMapService {
  private locationCache: any = {};
  private geoCoder: any;

  constructor(private camelIt: CameItPipe) {}

  private camelLocation(location: string): string {
    return this.camelIt.transform(location);
  }

  private cacheLocation(location: string, coordinates: any) {
    const camelLocation = this.camelLocation(location);
    this.locationCache[camelLocation] = coordinates;
  }

  private isLCached(location: string): boolean {
    return this.locationCache[this.camelLocation(location)];
  }

  private geoCodeLocation(location: string): Observable<any> {
    this.geoCoder = new window["google"]["maps"].Geocoder();

    return new Observable(ob => {
      this.geoCoder.geocode({ address: location }, (result, status) => {
        if (status === "OK") {
          const geometry = result[0].geometry.location;
          const coordinates = { lat: geometry.lat(), lng: geometry.lng() };

          this.cacheLocation(location, coordinates);
          ob.next(coordinates);
        } else {
          ob.error("Unable to geocode location. Please try again later.");
        }
      });
    });
  }

  getGeoLocation(location: string): Observable<any> {
    if (this.isLCached(location))
      return of(this.locationCache[this.camelLocation(location)]);

    return this.geoCodeLocation(location);
  }
}
