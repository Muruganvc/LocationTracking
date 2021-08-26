import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LocationTrackingComponent } from './location-tracking/location-tracking.component';
import { HttpClientModule } from '@angular/common/http';
import { IpAddressService } from './ip-address.service';

@NgModule({
  declarations: [
    AppComponent,
    LocationTrackingComponent
  ],
  imports: [
    BrowserModule,HttpClientModule
  ],
  providers: [IpAddressService],
  bootstrap: [AppComponent],
  entryComponents :[LocationTrackingComponent]
})
export class AppModule { }
