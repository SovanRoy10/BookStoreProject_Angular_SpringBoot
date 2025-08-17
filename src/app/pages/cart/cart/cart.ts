import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../services/cart';

interface CartItem {
  cartItemId: number;
  bookId: number;
  title: string;
  price: number;
  quantity: number;
  subtotal: number;
}

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (data) => {
        this.cartItems = data.items || [];
        this.total = data.grandTotal || 0;
      },
      error: (err) => {
        console.error('Failed to load cart', err);
      }
    });
  }

  removeItem(cartItemId: number): void {
    this.cartItems = this.cartItems.filter(item => item.cartItemId !== cartItemId);
    this.total = this.cartItems.reduce((acc, item) => acc + item.subtotal, 0);
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }
}
