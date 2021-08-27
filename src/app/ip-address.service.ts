import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { locationDetails } from './locationDetails';
@Injectable({
  providedIn: 'root'
})
export class IpAddressService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }
  getIPAddress() {
    return this.http.get("https://api.ipify.org/?format=json");
  }

  sendMail(value: locationDetails): Observable<string> {
    let baseUrl = `https://demosamplerestapi.azurewebsites.net/api/Email/SendMail`;
    return this.http.put<string>(baseUrl, JSON.stringify(value), { headers: this.httpOptions.headers, responseType: 'text' as 'json' });
  }

  getLocationDetails(latitude: any, longitude: any, apiKey: string) {
    let baseUrl = `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`;
    return this.http.get(baseUrl);
  }

  getName(name: string): Observable<string> {
    let baseUrl = `https://demosamplerestapi.azurewebsites.net/WeatherForecast/Display/${name}`;
    return this.http.get<string>(baseUrl, { headers: this.httpOptions.headers, responseType: 'text' as 'json' });
  }
}
