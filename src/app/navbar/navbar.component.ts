import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  // TemperatureAir TemperatureSoil
  menu_active_id: string = '';
  list_item = [
    { id: '/home', label: 'หน้าแรก', path: '/home', icon: 'home_app_logo' },
    { id: '/set-time', label: 'ตั้งเวลา', path: '/set-time', icon: 'manage_history' },
    { id: '/auto', label: 'อัตโนมัติ', path: '/auto', icon: 'autorenew' },
    { id: '/chart', label: 'กราฟ', path: '/chart', icon: 'bar_chart' },
  ]
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {
    // console.log(this.router.url);
    this.router.events.subscribe((res) => {
      this.menu_active_id = this.router.url;
    })
  }


  bt_active(id: string) {
    this.menu_active_id = id;
  }
}
