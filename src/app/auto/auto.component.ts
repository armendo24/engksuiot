import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormRecord,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.scss'],
})
export class AutoComponent implements OnInit {
  dataOption1 = [
    { id: 'temp', label: 'อุณหภูมิ' },
    { id: 'humidity_air', label: 'ความชื้นในอากาศ' },
    { id: 'humidity_soli', label: 'ความชื้นในดิน' },
    { id: 'rain', label: 'ปริมาณน้ำฝน' },
    { id: 'light', label: 'แสง' },
  ];
  dataOperator = [
    { id: '>', label: 'มากกว่า' },
    { id: '<', label: 'น้อยกว่า' },
    { id: '>=', label: 'มากกว่าเท่า' },
    { id: '<=', label: 'น้อยกว่าเท่ากับ' },
    { id: '==', label: 'เท่ากับ' },
  ];
  dataDevice = [
    { id: 'valve1', label: 'วาล์ว 1' },
    { id: 'valve2', label: 'วาล์ว 2' },
    { id: 'valve3', label: 'วาล์ว 3' },
    { id: 'valve4', label: 'วาล์ว 3' },
  ];

  formInput1 = new FormGroup({
    sensorsId: new FormControl('', [Validators.required]),
    operator: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    device: new FormControl('', [Validators.required]),
  });

  form = new FormRecord({
    name: new FormGroup({
      first: new FormControl('Nancy', Validators.minLength(2)),
      last: new FormControl('Drew', Validators.required),
    }),
    name2: new FormGroup({
      first: new FormControl('Nancy', Validators.minLength(2)),
      last: new FormControl('Drew', Validators.required),
    }),
  });

  dataForm: any = [];

  constructor(private fb: FormBuilder) {
    for (var i = 1; i <= 10; i++) {
      var obj: any = [];
      obj['id'] = 'programe_'+i;
      obj['sensorsId'] = "";
      obj['operator'] = '';
      obj['value'] = 0;
      obj['status'] = false;
      obj['device'] = '';
      obj['main_status'] = '';

      this.dataForm.push(obj);
    }
    console.log(this.dataForm);
  }

  ngOnInit(): void {}

  _substring(s: any) {
    if(s.substring(s.length - 2,s.length - 1) != '_'){
      return s.substring(s.length - 2);
    }else{
      return s.substring(s.length - 1);
    }

  }

  submit(data:any) {
    console.log(data);
    // this.formTest.addControl('agreement', new FormControl('English'))
    // this.form.controls
    // console.log("#####");
    // console.log(this.form.controls.name.value);
    // console.log(this.form.controls.name2.value);
  }
}
