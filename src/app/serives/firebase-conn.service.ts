import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  query,
  where,
  doc,
  docData,
} from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import {
  get,
  getDatabase,
  onValue,
  ref,
  set,
  child,
  update,
} from 'firebase/database';
import { environment } from 'src/environments/environment';

const app = initializeApp(environment.firebaseConfig);
const database = getDatabase(app);
@Injectable({
  providedIn: 'root',
})
export class FirebaseConnService {
  constructor(private firestore: Firestore) {}
  getData(key: string) {
    return get(child(ref(database), key));
    // const data = doc(this.firestore, 'set_time/valve_1/start_1');
    // console.log(docData(data));
    // return docData(data);
    // console.log(database);

    // get(child(ref(database), 'set_time/valve_1')).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     console.log(snapshot.val());
    //   } else {
    //     console.log("No data available");
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });
  }
  updateDataValve(data: any) {
    // update(ref(database), {'car_1/angle':angle,'car_1/x':x,'car_1/y':y,'car_1/distance':distance,'car_1/force':force})
    // var _id = id
    // update(ref(database), {'car_1/angle':angle})
  }
  update(data: any) {
    update(ref(database),data)
    // set(ref(database, 'set_time/' + data.id), data);
  }
}
