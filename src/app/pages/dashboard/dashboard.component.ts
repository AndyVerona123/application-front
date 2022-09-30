import {Component, OnInit} from '@angular/core';
import randomLocation from 'random-location';
import {Localtion} from '../../model/localtion';
import {LocationService} from '../../services/location.service';
import {LocalService} from '../../services/local.service';

// core components

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public currentValue: number;
  public thereIsCurrentLocation = false;
  public thereIsAnyLocation = false;
  public locations: Localtion[];
  public first = 0;
  public rows = 10;
  public lat;
  public lng;
  public origin: any;
  public destination: any;
  public total: number;
  public idUser: number;

  constructor(private locationService: LocationService, private localService: LocalService) {
  }


  ngOnInit() {
    this.idUser = this.localService.getValue('user').id;
    this.getLocationForUser();
  }

  public getLocationForUser() {
    this.locationService.getLocationForUser(this.idUser).subscribe(data => {
      if (data && data.body) {

        this.locations = data.body;
        this.total = this.locations.length;
        console.log(this.locations);
      }
    });
  }

  public generateLocation() {
    if (this.origin && this.destination) {
      let data;
      if (this.locations && this.locations.length) {
        console.log(this.destination.lat.toString);
        console.log(this.destination.lat.toString);
        data = this.locations.find(l => l.latitude === this.destination.lat.toString() && l.length === this.destination.lng.toString()
          && l.currentLatitude === this.origin.lat.toString() && l.currentLength === this.origin.lng.toString());
      }
      if (!data) {
        const location = new Localtion();
        location.currentLength = this.origin.lng;
        location.currentLatitude = this.origin.lat;
        location.latitude = this.destination.lat;
        location.length = this.destination.lng;
        location.fkUser = this.localService.getValue('user').id;
        this.locationService.createLocation(location).subscribe(() => {
          this.getLocationForUser();
        });
      }
    }
  }

  public getCurrentLocation() {
    if (this.isNullOrEmpty(this.lat) && this.isNullOrEmpty(this.lng)) {
      navigator.geolocation.getCurrentPosition(resp => {
        if (resp) {
          this.lat = resp.coords.latitude;
          this.lng = resp.coords.longitude;
          this.origin = {lat: resp.coords.latitude, lng: resp.coords.longitude};
        }
        this.thereIsCurrentLocation = true;
      });
    }
  }

  public generateRandomLocation() {
    if (this.currentValue) {
      const R = this.currentValue; // meters
      const P = {
        latitude: this.lat,
        longitude: this.lng
      };
      const randomPoint = randomLocation.randomCirclePoint(P, R);
      this.destination = {lat: randomPoint.latitude, lng: randomPoint.longitude};
      this.thereIsAnyLocation = true;
    }
  }

  public isNullOrEmpty(value) {
    return value === null || value === undefined || value === '';
  }

}
