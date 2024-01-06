import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Books, BookFile } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
    private http: HttpClient
  ) { }

  // Get all books ordered by title
  getBooks() {
    return this.http.get<Books[]>(`${environment.apiUrl}/books/`);
  }

  // Get all books ordered by title
  getBookFile(BookID: number, tipo: number) {
    return this.http.get<BookFile>(`${environment.apiUrl}/books/bookFile/${BookID}/${tipo}`);
  }

}

