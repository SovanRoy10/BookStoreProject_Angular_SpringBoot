import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
}

@Component({
  imports :[FormsModule,CommonModule],
  selector: 'app-book-detail',
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css'
})
export class BookDetail implements OnInit {
  id!: string;
  book: any;
  reviews: Review[] = [];
  user: any;
  newRating: number = 5;
  newComment: string = '';
  error: string = '';
  success: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';

    // Simulated book data
    this.book = {
      id: this.id,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 299,
      isbn: '9780743273565',
      publishDate: '1925-04-10',
      category: 'Classic Literature',
      // categoryName
      stock: 12,
      // stockQuanity
      description:
        'A novel set in the Roaring Twenties, telling the story of Jay Gatsby and his unrequited love for Daisy Buchanan.',
      image:
        'https://www.bookswagon.com/productimages/images200/862/9780190635862.jpg'
        // coverImageUrl
    };

    // Simulated reviews
    this.reviews = [
      {
        id: 1,
        name: 'John Doe',
        rating: 5,
        date: '2025-08-01',
        comment: 'Amazing book! A timeless classic.'
      },
      {
        id: 2,
        name: 'Jane Smith',
        rating: 4,
        date: '2025-07-28',
        comment: 'Loved the writing style and characters.'
      }
    ];

    // Simulated user
    this.user = {
      name: 'Sovan Roy',
      orderHistory: ['123', '456', this.id]
    };

    window.scrollTo(0, 0);
  }

  get averageRating(): string {
    if (this.reviews.length === 0) return '0';
    return (
      this.reviews.reduce((sum, r) => sum + r.rating, 0) / this.reviews.length
    ).toFixed(1);
  }

  handleSubmitReview() {
    this.error = '';
    this.success = '';

    if (!this.user.orderHistory.includes(this.book.id)) {
      this.error = 'You can only review books you have purchased.';
      return;
    }

    if (this.newComment.trim() === '') {
      this.error = 'Please enter a comment.';
      return;
    }

    if (
      isNaN(this.newRating) ||
      this.newRating < 0.5 ||
      this.newRating > 5
    ) {
      this.error = 'Rating must be between 0.5 and 5.';
      return;
    }

    const newReview: Review = {
      id: this.reviews.length + 1,
      name: this.user.name,
      rating: this.newRating,
      date: new Date().toISOString().slice(0, 10),
      comment: this.newComment.trim()
    };

    this.reviews = [newReview, ...this.reviews];
    this.newComment = '';
    this.newRating = 5;
    this.success = 'Review added successfully!';
  }
}
