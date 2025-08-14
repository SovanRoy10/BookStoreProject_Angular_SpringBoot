import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Cart {
  private apiUrl = 'https://api.example.com/cart'; // change to your API
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addToCart(bookId: string, quantity: number): Observable<any> {
    return this.http.post(this.apiUrl, { bookId, quantity });
  }

  removeFromCart(itemId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${itemId}`);
  }

  clearCart(): Observable<any> {
    return this.http.delete(this.apiUrl);
  }

  updateCartState(items: any[]) {
    this.cartItems.next(items);
  }
}
