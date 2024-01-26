import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { map, finalize } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Employee } from '@app/_models';

const baseUrl = `${environment.apiUrl}/qr-buzz`;

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
    return this.http.post(`${baseUrl}/empleado`, employee);
  }

}
