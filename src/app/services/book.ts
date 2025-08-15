import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://api.example.com/books'; // change to your API

  constructor(private http: HttpClient) {}

  // GET all books
  getAllBooks(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // GET book by ID
  getBookById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // GET recommended books
  getRecommendedBooks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/recommended`);
  }

  // GET trending books
  getTrendingBooks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/trending`);
  }

  // PUT update book
  updateBook(id: string, bookData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, bookData);
  }

  // POST add a new book
  addBook(bookData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, bookData);
  }

  // DELETE book by ID
  deleteBook(id: number | string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
