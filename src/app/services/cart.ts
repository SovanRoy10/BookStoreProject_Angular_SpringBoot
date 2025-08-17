import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'https://api.example.com/cart'; // change to your API
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    // return this.http.get(this.apiUrl);
    return this.http.get(`https://dummyjson.com/c/3b79-4674-48cd-8b44`);
  }

  addToCart(bookId: string, quantity: number): Observable<any> {
    // return this.http.post(this.apiUrl, { bookId, quantity });
    return this.http.post("https://dummyjson.com/c/64f3-f1ad-4174-b01f",{bookId,quantity});
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
