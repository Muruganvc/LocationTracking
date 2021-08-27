import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class IpAddressService {

  constructor(private http: HttpClient) { }
  getIPAddress() {
    return this.http.get("https://api.ipify.org/?format=json");
  }

  getLocationDetails(latitude: any, longitude: any, apiKey: string) {
    let baseUrl = `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`;
    return this.http.get(baseUrl);
  }
}
