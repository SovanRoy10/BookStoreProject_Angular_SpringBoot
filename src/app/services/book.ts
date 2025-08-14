import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Book {
  private apiUrl = 'https://api.example.com/books'; // change to your API

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getBookById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getRecommendedBooks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/recommended`);
  }

  getTrendingBooks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/trending`);
  }

  updateBook(id: string, bookData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, bookData);
  }
}
