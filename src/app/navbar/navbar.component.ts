import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  // TemperatureAir TemperatureSoil
  list_item = [
    {id:'home',label:'หน้าแรก' , path:'/home',icon:'home_app_logo'},
    {id:'outdoor',label:'สถานะนอกโรงเรือน' , path:'/outdoor',icon:'wb_cloudy'},
    {id:'control',label:'ควบคุม' , path:'/control',icon:'control_camera'},
    {id:'pump',label:'สถานะปั๊มน้ำ' , path:'/pump',icon:'settings'},
  ]
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

}
