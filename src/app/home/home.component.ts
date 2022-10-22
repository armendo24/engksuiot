import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  temp:number = 27;
  humidity_air:number = 87.32;
  humidity_soli:number = 96.22;
  water_valve1:boolean = true;
  water_valve2:boolean = false;
  water_valve3:boolean = true;
  rain:number = 0.0;
  light:number = 0.00;
  constructor() { }

  ngOnInit(): void {
  }

}
