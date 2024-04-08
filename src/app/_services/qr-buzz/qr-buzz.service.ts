import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { map, finalize } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Employee, VcardData } from '@app/_models';

const baseUrlQR = `${environment.apiUrl}/qr-buzz`;
const baseUrlvCard = `${environment.apiUrl}/vcard`;

@Injectable({
  providedIn: 'root'
})
export class QrBuzzService {
  // private accountSubject: BehaviorSubject<Account>;
  // public account: Observable<Account>;

  constructor(
    // private router: Router,
    private http: HttpClient
  ) {
    // this.accountSubject = new BehaviorSubject<Account>(null);
    // this.account = this.accountSubject.asObservable();
  }

  // public get accountValue(): Account {
  //   return this.accountSubject.value;
  // }

  // Create new employee into db
  newEmployee(employee: Employee) {
    return this.http.post(`${baseUrlQR}/empleado`, employee);
  }


  // get vcard data
  getVCardData(id: number) {
    return this.http.get<VcardData>(`${baseUrlvCard}/${id}`);
  }

}
