import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'https://api.example.com/books'; // change to your API

  // BehaviorSubject to store search request
  private searchEventSource = new BehaviorSubject<{
    type: string;
    query: string;
  } | null>(null);
  searchEvent$ = this.searchEventSource.asObservable();

  constructor(private http: HttpClient) {}

  triggerSearch(type: string, query: string) {
    this.searchEventSource.next({ type, query });
  }

  // GET all books
  getAllBooks(): Observable<any> {
    // return this.http.get(`${this.apiUrl}/categories/get-all`);
    return this.http.get(`https://dummyjson.com/c/05eb-5a96-415c-81ed`);
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

  // BULK upload
  bulkUploadBooks(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/bulk-upload`, formData);
  }

  // SEARCH methods
  searchBooksByTitle(title: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/search?title=${encodeURIComponent(title)}`
    );
  }

  searchBooksByAuthor(author: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/search?author=${encodeURIComponent(author)}`
    );
  }

  searchBooksByIsbn(isbn: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/search?isbn=${encodeURIComponent(isbn)}`
    );
  }

  // GET all categories
  getAllCategories(): Observable<any> {
    // return this.http.get(`${this.apiUrl}/get-all-categories`);
    return this.http.get(`https://dummyjson.com/c/eff1-4df4-47b8-9f10`);
  }
}

// /api/books/search?title=book_name: ✅
// /api/categories/get-all : ✅
// /api/categories/get/name/category
// /api/books/search?category=category_name
// /search?sortBy=price&sortDir=asc
// /search?sortBy=publishDate&sortDir=desc
// /search?minPrice=price&maxPrice=asc
// /api/books/search?available=true

// placed,shift,cancelled,delivered,return

// order id same , multiple product

// return orders list in admin section

// make changes in order history table in profile, after clicking the order id , another page open consisting that orders
// where I have the return option
