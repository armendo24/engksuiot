import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { FirebaseConnService } from '../serives/firebase-conn.service';

export interface valve {
  id: number;
  start_1: Date;
  start_2: Date;
  start_3: Date;
  end_1: Date;
  end_2: Date;
  end_3: Date;
}

@Component({
  selector: 'app-set-time',
  templateUrl: './set-time.component.html',
  styleUrls: ['./set-time.component.scss'],
  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }],
})
export class SetTimeComponent implements OnInit {
  dataValve: any = new Array(4);
  isChecked = true;
  mytime: Date | undefined = new Date();
  constructor(
    private firebase: FirebaseConnService,
    private _snackBar: MatSnackBar
  ) {
    this.getDataValve();
  }
  ngOnInit(): void {
    var time_len = 3;
    for (var i = 1; i <= this.dataValve.length; i++) {
      var arr: any = { id: 'valve_' + i };
      for (var j = 1; j <= time_len; j++) {
        arr['start_' + j] = void 0;
        arr['end_' + j] = void 0;
        arr['status_' + j] = false;
      }
      this.dataValve[i - 1] = arr;
    }
  }

  getDataValve() {
    this.firebase.getData('/').then((snapshot: any) => {
      var arr: any[] = [];
      if (snapshot.exists()) {
        console.log(snapshot.val());
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
        this.dataValve = arr;
      }
    });
  }

  deCodeHours(val: string) {
    var h: string = val.substring(0, 2);
    return h;
  }
  deCodeMinutes(val: string) {
    var m: string = val.substring(3, 5);
    return m;
  }

  toDate(h: number, m: number) {
    const time = new Date();
    time.setHours(h);
    time.setMinutes(m);
    return time;
  }
  _substring(s: any) {
    return s.substring(s.length - 1);
  }

  submit(valve: any) {
    var objUpdate: any = {};
    var obj = Object.assign({}, valve);

    for (var i = 1; i <= 3; i++) {
      var ts_h = valve['start_' + i].getHours();
      var ts_m = valve['start_' + i].getMinutes();
      var te_h = valve['end_' + i].getHours();
      var te_m = valve['end_' + i].getMinutes();
      if (ts_h > te_h && te_h != 0) {
        alert(
          'วาล์ว ' +
            this._substring(valve.id) +
            ' ช่วงเวลาที่ ' +
            i +
            ' เวลาเริ่มมากกว่าเวลาสิ้นสุด!!'
        );
        return;
      } else if (ts_h == te_h) {
        if (ts_m > te_m) {
          alert(
            'วาล์ว ' +
              this._substring(valve.id) +
              ' ช่วงเวลาที่ ' +
              i +
              ' เวลาเริ่มมากกว่าเวลาสิ้นสุด!!'
          );
          return;
        }
      }
    }
    var status = obj['status'];
    for (var key in obj) {
      if (typeof obj[key] == 'object') {
        objUpdate[obj.id + '/' + key] = this.enCodeTime(obj[key]);
        obj[key] = this.enCodeTime(obj[key]);
      } else if (key.substring(0, 6) == 'status') {
        if (key.substring(0, 7) == 'status_') {
          if (obj[key]) {

            status = false;
            console.log(key, status);
          }
        }
        objUpdate[obj.id + '/' + key] = obj[key];
      }
    }
    objUpdate[obj.id + '/status'] = status;
    this.firebase.update(objUpdate);
    this._snackBar.open(
      'บันทึกข้อมูล' + ' วาล์ว ' + this._substring(valve.id),
      'ตกลง',
      {
        duration: 2000,
      }
    );
  }
  enCodeTime(time: Date) {
    var h = this.convertTo2(time.getHours());
    var m = this.convertTo2(time.getMinutes());
    return h + ':' + m;
  }
  convertTo2(n: any) {
    n = String(n);
    if (n.length == 1) n = '0' + n;
    return n;
  }

  arrayEmpty(n: number) {
    return new Array(n).fill('');
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
    labelSeconds: 'Seconds',
  });
}
