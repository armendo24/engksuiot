import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';

@Component({
  selector: 'app-set-time',
  templateUrl: './set-time.component.html',
  styleUrls: ['./set-time.component.scss'],
  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }]
})
export class SetTimeComponent implements OnInit {

  valve_1_time_start_1: Date = new Date();
  valve_1_time_end_1: Date = new Date();
  valve_1_time_start_2: Date = new Date();
  valve_1_time_end_2: Date = new Date();
  valve_1_time_start_3: Date = new Date();
  valve_1_time_end_3: Date = new Date();

  valve_2_time_start_1: Date = new Date();
  valve_2_time_end_1: Date = new Date();
  valve_2_time_start_2: Date = new Date();
  valve_2_time_end_2: Date = new Date();
  valve_2_time_start_3: Date = new Date();
  valve_2_time_end_3: Date = new Date();

  valve_3_time_start_1: Date = new Date();
  valve_3_time_end_1: Date = new Date();
  valve_3_time_start_2: Date = new Date();
  valve_3_time_end_2: Date = new Date();
  valve_3_time_start_3: Date = new Date();
  valve_3_time_end_3: Date = new Date();

  dataValve: any = {
    valve_1: {
      time_start_1:new Date()
    },
    valve_2: {},
    valve_3:{}
  };

  hour: string[] = [];
  minute: string[] = [];

  constructor() {

  }
  ngOnInit(): void {

    for (var i = 1; i <= 3; i++) {
      this.dataValve.valve_1['time_start_' + i] = new Date();
      this.dataValve.valve_1['time_end_' + i] = new Date();

      this.dataValve.valve_2['time_start_' + i] = new Date();
      this.dataValve.valve_2['time_end_' + i] = new Date();

      this.dataValve.valve_3['time_start_' + i] = new Date();
      this.dataValve.valve_3['time_end_' + i] = new Date();

    }
    console.log(this.dataValve);
  }

  _substring(s: any) {
    return s.substring(s.length - 1)
  }

  submit_time_1() {
    console.log(this.valve_1_time_start_1.getHours(), this.valve_1_time_start_1.getMinutes());
  }
  getvalue(obj:any,key:string){
console.log(obj,key);
  }
}
export function getTimepickerConfig(): TimepickerConfig {
  return Object.assign(new TimepickerConfig(), {
    hourStep: 1,
    minuteStep: 1,
    showMeridian: false,
    readonlyInput: false,
    mousewheel: true,
    showMinutes: true,
    showSeconds: false,
    labelHours: 'Hours',
    labelMinutes: 'Minutes',
    labelSeconds: 'Seconds'
  });
}
