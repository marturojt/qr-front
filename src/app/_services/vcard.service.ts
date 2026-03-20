import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Vcard } from '@app/_models';

const baseUrl = `${environment.apiUrl}/vcard`;

@Injectable({ providedIn: 'root' })
export class VcardService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Vcard[]>(baseUrl);
  }

  getById(id: number) {
    return this.http.get<Vcard>(`${baseUrl}/${id}`);
  }

  create(vcard: Vcard) {
    return this.http.post<Vcard>(baseUrl, vcard);
  }

  update(id: number, vcard: Partial<Vcard>) {
    return this.http.put<Vcard>(`${baseUrl}/${id}`, vcard);
  }

  delete(id: number) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
