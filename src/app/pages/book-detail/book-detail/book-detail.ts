import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../services/book';
import Swal from 'sweetalert2';

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
}

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-book-detail',
  templateUrl: './book-detail.html',
  styleUrls: ['./book-detail.css'],
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

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.loadBook();
    this.loadReviews();

    // Simulated logged-in user
    this.user = {
      name: 'Sovan Roy',
      orderHistory: [2, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    };

    window.scrollTo(0, 0);
  }

  loadBook() {
    Swal.fire({
      title: 'Loading book...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    this.bookService.getBookById(this.id).subscribe({
      next: (data) => {
        this.book = data;
        console.log('📘 Book ID:', this.book.id);
        console.log('🛒 User orderHistory:', this.user?.orderHistory);
        Swal.close();
      },
      error: (err) => {
        Swal.fire('Error!', 'Failed to load book details', 'error');
        console.error('Book load error:', err);
      },
    });
  }

  loadReviews() {
    this.bookService.getReviewsUsingBookId(this.id).subscribe({
      next: (data: any[]) => {
        this.reviews = data.map((r) => ({
          id: r.reviewId,
          name: r.user?.name || 'Anonymous',
          rating: r.rating,
          date: new Date(r.reviewDate).toISOString().slice(0, 10),
          comment: r.comment,
        }));
      },
      error: (err) => {
        Swal.fire('Error!', 'Failed to load reviews', 'error');
        console.error('Review load error:', err);
      },
    });
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

  if (isNaN(this.newRating) || this.newRating < 0.5 || this.newRating > 5) {
    this.error = 'Rating must be between 0.5 and 5.';
    return;
  }

  const newReview: Review = {
    id: this.reviews.length + 1,
    name: this.user.name,
    rating: this.newRating,
    date: new Date().toISOString().slice(0, 10),
    comment: this.newComment.trim(),
  };

  Swal.fire({
    icon: 'info',
    title: 'Submitting Review...',
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
  });

  // ✅ Call service
  this.bookService.addReview(newReview, this.book.id).subscribe({
    next: (res) => {
      // Update UI with new review
      this.reviews = [newReview, ...this.reviews];

      // Reset form
      this.newComment = '';
      this.newRating = 5;

      Swal.fire('Success!', 'Your review has been added.', 'success');
      console.log('✅ Review saved on server:', res);
    },
    error: (err) => {
      Swal.fire('Error!', 'Failed to save review', 'error');
      console.error('❌ Review save error:', err);
    },
  });
}

}
