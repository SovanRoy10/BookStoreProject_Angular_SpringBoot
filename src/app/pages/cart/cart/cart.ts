import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CartItem {
  id: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  imports :[CommonModule, FormsModule],
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);

    // Static cart items for now
    this.cartItems = [
      {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        price: 299,
        quantity: 1,
        image: 'https://www.bookswagon.com/productimages/images200/862/9780190635862.jpg'
      },
      {
        id: 2,
        title: '1984',
        author: 'George Orwell',
        price: 280,
        quantity: 2,
        image: 'https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg'
      }
    ];

    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  removeItem(id: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    this.calculateTotal();
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }
}
