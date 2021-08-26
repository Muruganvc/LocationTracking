import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { LocationTrackingComponent } from './location-tracking/location-tracking.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  componentRef: any;

  default: boolean = true;

  @ViewChild('messagecontainer', { read: ViewContainerRef }) entry: ViewContainerRef;
  constructor(private resolver: ComponentFactoryResolver) { }

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
