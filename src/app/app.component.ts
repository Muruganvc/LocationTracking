import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { LocationTrackingComponent } from './location-tracking/location-tracking.component';
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  componentRef: any;
  default: boolean = true;
  deviceInfo = null;
  isMobile :boolean = false;
  details :string ;
  @ViewChild('messagecontainer', { read: ViewContainerRef }) entry: ViewContainerRef;
  constructor(private resolver: ComponentFactoryResolver,private deviceService: DeviceDetectorService) {
    this.epicFunction();
   }
  

  epicFunction() {
    console.log('hello `Home` component');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    this.details = `Browser : ${this.deviceInfo.browser}, Browser Version: ${this.deviceInfo.browser_version}, Device : ${this.deviceInfo.device},Device type : ${this.deviceInfo.deviceType}, Orientation : ${this.deviceInfo.orientation}, Operating System : ${this.deviceInfo.os}, os_version : ${this.deviceInfo.os_version}`
  }

  ngOnInit(): void {
  }
   
  createComponent(userName: string, email?: string) {

    if(userName.trim() == ""){
      alert('Enter user Name');
      return false;
    }
    this.default = false;
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(LocationTrackingComponent);
    this.componentRef = this.entry.createComponent(factory);
    this.componentRef.instance.userName = userName;
    this.componentRef.instance.userMailId = email;
  }
  destroyComponent() {
    this.componentRef.destroy();
  }
}
