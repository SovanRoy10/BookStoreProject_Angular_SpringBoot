import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../services/book';

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  isbn: string;
  publishDate: string;
  categoryName: string;
  stockQuantity: number;
  description: string;
  coverImageUrl: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  onStockBlur(
    arg0: string,
    _t30: HTMLInputElement,
    _t17: {
      id: number;
      title: string;
      author: string;
      price: number;
      image: string;
      rating: number;
    }
  ) {
    throw new Error('Method not implemented.');
  }
  isAdmin = true; // toggle for admin/user view

  books: Book[] = [];
  // books = [
  //   {
  //     id: 1,
  //     title: 'The Silent Patient',
  //     author: 'Alex Michaelides',
  //     price: 499,
  //     image: 'https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UY218_.jpg',
  //     rating: 4.5,
  //   },
  //   {
  //     id: 2,
  //     title: 'Atomic Habits',
  //     author: 'James Clear',
  //     price: 599,
  //     image: 'https://m.media-amazon.com/images/I/91bYsX41DVL.jpg',
  //     rating: 4.5,
  //   },
  //   {
  //     id: 3,
  //     title: 'Ikigai',
  //     author: 'Héctor García',
  //     price: 350,
  //     image: 'https://m.media-amazon.com/images/I/81l3rZK4lnL.jpg',
  //     rating: 4.5,
  //   },
  //   {
  //     id: 4,
  //     title: 'Think Like a Monk',
  //     author: 'Jay Shetty',
  //     price: 450,
  //     image: 'https://m.media-amazon.com/images/I/71g2ednj0JL.jpg',
  //     rating: 4.5,
  //   },
  //   {
  //     id: 5,
  //     title: 'The Alchemist',
  //     author: 'Paulo Coelho',
  //     price: 299,
  //     image: 'https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg',
  //     rating: 4.5,
  //   },
  //   {
  //     id: 6,
  //     title: 'Deep Work',
  //     author: 'Cal Newport',
  //     price: 550,
  //     image: 'https://m.media-amazon.com/images/I/81gTwYAhU7L.jpg',
  //     rating: 4.5,
  //   },
  //   {
  //     id: 7,
  //     title: 'Rich Dad Poor Dad',
  //     author: 'Robert Kiyosaki',
  //     price: 399,
  //     image: 'https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg',
  //     rating: 4.5,
  //   },
  //   {
  //     id: 8,
  //     title: 'The Psychology of Money',
  //     author: 'Morgan Housel',
  //     price: 420,
  //     image: 'https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UY218_.jpg',
  //     rating: 4.5,
  //   },
  //   {
  //     id: 9,
  //     title: 'Sapiens',
  //     author: 'Yuval Noah Harari',
  //     price: 650,
  //     image: 'https://m.media-amazon.com/images/I/713jIoMO3UL.jpg',
  //     rating: 4.5,
  //   },
  //   {
  //     id: 10,
  //     title: 'Educated',
  //     author: 'Tara Westover',
  //     price: 499,
  //     image: 'https://m.media-amazon.com/images/I/81WojUxbbFL.jpg',
  //     rating: 4.5,
  //   },
  //   {
  //     id: 11,
  //     title: 'Becoming',
  //     author: 'Michelle Obama',
  //     price: 599,
  //     image: 'https://m.media-amazon.com/images/I/81h2gWPTYJL.jpg',
  //     rating: 4.5,
  //   },
  //   {
  //     id: 12,
  //     title: 'The Power of Habit',
  //     author: 'Charles Duhigg',
  //     price: 450,
  //     image: 'https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UY218_.jpg',
  //     rating: 4.5,
  //   },
  // ];

  lowStockBooks: Book[] = [];
  stockThreshold = 5; // you can change this to any limit

  users = [
    { id: 'U001', name: 'John Doe', email: 'john@example.com' },
    { id: 'U002', name: 'Jane Smith', email: 'jane@example.com' },
  ];

  searchResults: any[] = [];

  constructor(private router: Router, private bookService: BookService) {}

  private async confirmAction(
    title: string,
    text: string,
    confirmText: string,
    actionFn: () => void
  ) {
    const result = await Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmText,
    });
    if (result.isConfirmed) {
      actionFn();
    }
  }

  loading = false;

  // get all books api
  loadBooks() {
    this.loading = true;
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.loading = false;
      },
      error: () => {
        Swal.fire('Error!', 'Failed to fetch books.', 'error');
        this.loading = false;
      },
    });
  }

  // delete book by id api
  deleteBook(bookId: number, bookTitle: string) {
    this.confirmAction(
      'Delete Book?',
      `Are you sure you want to delete "${bookTitle}"? This action cannot be undone.`,
      'Yes, delete it!',
      () => {
        this.bookService.deleteBook(bookId).subscribe({
          next: (response) => {
            Swal.fire('Deleted!', 'The book has been deleted.', 'success');
            this.loadBooks(); // Refresh book list after deletion
          },
          error: (error) => {
            console.error('Delete API Error:', error); // <-- Log error details
            Swal.fire('Error!', 'Failed to delete book.', 'error');
          },
        });
      }
    );
  }

  addBook() {
    this.router.navigate([`/admin/add-book`]);
  }

  editBook(bookId: number) {
    this.router.navigate([`/admin/edit-book/${bookId}`]);
  }

  // bulk upload api
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    // Confirm before upload
    this.confirmAction(
      'Bulk Upload Books?',
      `You are about to upload: ${file.name}. Continue?`,
      'Yes, upload!',
      () => {
        this.bookService.bulkUploadBooks(file).subscribe({
          next: (response) => {
            console.log('Bulk Upload Response:', response); // <-- See backend response
            Swal.fire('Success!', 'Books uploaded successfully.', 'success');
            this.loadBooks(); // Refresh list
          },
          error: (error) => {
            console.error('Bulk Upload Error:', error); // <-- Log full error
            Swal.fire('Error!', 'Failed to upload books.', 'error');
          },
        });
      }
    );
  }

  // low stock api
  // new method
  loadLowStockBooks() {
    this.bookService.getLowStockBooks(this.stockThreshold).subscribe({
      next: (data) => {
        this.lowStockBooks = data;

        if (this.isAdmin && this.lowStockBooks.length > 0) {
          setTimeout(() => {
            Swal.fire({
              title: 'Low Stock Alert 🚨',
              html: this.lowStockBooks
                .map((b) => `<b>${b.title}</b> (Stock: ${b.stockQuantity})`)
                .join('<br>'),
              icon: 'warning',
            });
          }, 3000); // 3 seconds delay
        }
      },
      error: () => {
        console.error('Failed to fetch low stock books');
      },
    });
  }

  // search api call
  ngOnInit() {
    this.loadBooks();
    // Fetch books from API when home page loads
    this.loading = true;
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        if (!this.isAdmin) this.books = data.slice(0, 4);
        else this.books = data;
        this.loading = false;
      },
      error: () => {
        Swal.fire('Error!', 'Failed to fetch books.', 'error');
        this.loading = false;
      },
    });

    this.bookService.searchEvent$.subscribe((event) => {
      if (!event) return;

      this.loading = true; // <-- START loading before making the API call

      let apiCall;
      switch (event.type) {
        case 'title':
          apiCall = this.bookService.searchBooksByTitle(event.query);
          break;
        case 'author':
          apiCall = this.bookService.searchBooksByAuthor(event.query);
          break;
        case 'isbn':
          apiCall = this.bookService.searchBooksByIsbn(event.query);
          break;
      }

      if (apiCall) {
        apiCall.subscribe({
          next: (data) => {
            this.searchResults = data;
            this.loading = false; // <-- STOP loading when data arrives
          },
          error: () => {
            Swal.fire('Error!', 'Failed to fetch search results.', 'error');
            this.loading = false;
          },
        });
      } else {
        this.loading = false;
      }
    });

    this.loadLowStockBooks();
  }
}
