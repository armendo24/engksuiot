import { Component, OnInit } from '@angular/core';
import { FirebaseConnService } from '../serives/firebase-conn.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  temp: number = 27;
  humidity_air: number = 87.32;
  humidity_soli: number = 96.22;
  water_valve1: boolean = true;
  water_valve2: boolean = false;
  water_valve3: boolean = true;
  water_valve4: boolean = true;

  dataValve: any = {};

  rain: number = 0.0;
  light: number = 0.0;

  dataNow: Date = new Date();
  constructor(private firebase: FirebaseConnService) {}

  ngOnInit(): void {
    for (var i = 1; i <= 4; i++) {
      this.dataValve['valve_' + i] = false;
    }

    this.getDataValve();
  }

  getDataValve() {
    this.firebase.getData('/').then((snapshot: any) => {
      var arr: any[] = [];
      if (snapshot.exists()) {
        var obj = snapshot.val();
        for (var key in obj) {
          for (var key2 in obj[key]) {
            if (key2 == 'id') {
            } else if (key2.substring(0, 6) == 'status') {
            } else {
              var h = parseInt(this.deCodeHours(obj[key][key2]));
              var m = parseInt(this.deCodeMinutes(obj[key][key2]));
              // console.log(key2,h,m);
              obj[key][key2] = this.toDate(h, m);
            }
          }
          arr.push(obj[key]);
        }

        for (var obj of arr) {
          if (obj.status) {
            this.dataValve[obj.id] = obj.status;
          } else {
            for (var key in obj) {
              if (key.substring(0, 7) == 'status_') {
                if (obj[key]) {
                  var start = obj['start_' + this._substring(key)];
                  var end = obj['end_' + this._substring(key)];
                  if (this.dataNow >= start && this.dataNow <= end) {
                    this.dataValve[obj.id] = true;
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  _substring(s: any) {
    return s.substring(s.length - 1);
  }

  deCodeHours(val: string) {
    return val.substring(0, 2);
  }
  deCodeMinutes(val: string) {
    return val.substring(3, 5);
  }

  toDate(h: number, m: number) {
    const time = new Date();
    time.setHours(h);
    time.setMinutes(m);
    return time;
  }

  updateValve(val: any) {
    var dataUpdate: any = {};
    dataUpdate[val.key + '/status'] = val.value;
    dataUpdate[val.key + '/status_1'] = false;
    dataUpdate[val.key + '/status_2'] = false;
    dataUpdate[val.key + '/status_3'] = false;
    this.firebase.update(dataUpdate);
  }

  config_toggle: any = {
    onColor: 'primary',
    offColor: 'secondary',
    onText: 'เปิด',
    offText: 'ปิด',
    disabled: false,
    size: '',
    value: false,
  };
}
