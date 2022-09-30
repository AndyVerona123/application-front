import {Component, OnInit} from '@angular/core';
import randomLocation from 'random-location';

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
  customers: any[];

  first = 0;

  rows = 10;

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public latitude1 = 6.2518400;
  public latitude2 = 4.666;
  public longitude1 = -75.5635900;
  public longitude2 = -74.084;
  public lat;
  public lng;

  public origin: any;
  public destination: any;
  public acepto = false;


  ngOnInit() {
/*    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});*/
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

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
