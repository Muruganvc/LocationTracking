import { Component, Input, OnInit } from '@angular/core';
import { IpAddressService } from '../ip-address.service';
import { locationDetails } from '../locationDetails';

declare const L: any;

@Component({
  selector: 'app-location-tracking',
  templateUrl: './location-tracking.component.html',
  styleUrls: ['./location-tracking.component.css']
})
export class LocationTrackingComponent implements OnInit {

  constructor(private http: IpAddressService) { }
  @Input() userName: string;
  @Input() userMailId: string;
  latitude: any
  longitude: any;
  ipAddress: any;
  locationDetails: string;
  ngOnInit(): void {
    this.http.getIPAddress().subscribe((result: any) => {
      if (result) {
        this.getGeoLocation(result.ip);
        this.ipAddress = result;
      }
    })
  }

  close() {
    var result = confirm("Are you sure you want to quit?");
    if (result == true) {
      window.close();
    }
  }
  getGeoLocation(ipAddress: string) {
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    navigator.geolocation.getCurrentPosition(pos => {
      const location = pos.coords;
      this.longitude = location.longitude;
      this.latitude = location.latitude;
      console.log(`lat ${pos.coords.latitude} lon ${pos.coords.longitude}`);
      let user = new locationDetails();
      user.toMaild = this.userMailId;
      user.ipAddress = ipAddress;
      user.latitude = this.latitude;
      user.longitude = this.longitude;
      user.name = this.userName;
      this.http.sendMail(user).subscribe((result: any) => {
        console.log(result);
      });

      this.http.getLocationDetails(this.latitude, this.longitude, 'pk.7cbf6182f55523dc9b9d46159e328485').subscribe((result: any) => {
        let addr = result.address;
        this.locationDetails = `City : ${addr.city}, District  : ${addr.city_district}, clinic : ${addr.clinic}, Country : ${addr.country},country_code : ${addr.country_code}, neighbourhood : ${addr.neighbourhood}, postcode : ${addr.postcode}, road : ${addr.road},state : ${addr.state}, state_district : ${addr.state_district}, suburb : ${addr.suburb}`;
        console.log(result);
      })

      var mymap = L.map('map').setView([location.latitude, location.longitude], 13);

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXVydWdhbnZjIiwiYSI6ImNrc3NsczAydDB4bXgycG9kNTRjaDQyaGoifQ.NELZ51aOmkzZXh9J44Qx9w', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery ?? <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
      }).addTo(mymap);

      var marker = L.marker([location.latitude, location.longitude]).addTo(mymap);

      // var circle = L.circle([location.latitude, location.longitude], {
      //   color: 'red',
      //   fillColor: '#f03',
      //   fillOpacity: 0.5,
      //   radius: 500
      // }).addTo(mymap);

      marker.bindPopup("Hi, " + this.userName).openPopup();
      // circle.bindPopup(`Hey ${this.userName}, this is your corrent location`);
      var popup = L.popup()
        .setLatLng([location.latitude, location.longitude])
        .setContent("Hi," + this.userName)
        .openOn(mymap);
    });
    this.watchPosition();
  }

  watchPosition() {
    let desLat = 0;
    let id = navigator.geolocation.watchPosition(pos => {
      console.log(`lat : ${pos.coords.latitude}, lon :${pos.coords.longitude}`);
      if (pos.coords.latitude === desLat) {
        navigator.geolocation.clearWatch(id);
      }
    }, err => {
      console.log(err);
    }, {
      enableHighAccuracy: true,
      timeout: 0,
      maximumAge: 0
    })
  }
}
