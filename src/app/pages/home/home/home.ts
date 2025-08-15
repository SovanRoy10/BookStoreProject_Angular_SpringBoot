import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ManageAdminsComponent } from '../../../shared/manage-admins/manage-admins';
import { BookService } from '../../../services/book';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, ManageAdminsComponent],
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
  isAdmin = false; // toggle for admin/user view

  books = [
    {
      id: 1,
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      price: 499,
      image: 'https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UY218_.jpg',
      rating: 4.5,
    },
    {
      id: 2,
      title: 'Atomic Habits',
      author: 'James Clear',
      price: 599,
      image: 'https://m.media-amazon.com/images/I/91bYsX41DVL.jpg',
      rating: 4.5,
    },
    {
      id: 3,
      title: 'Ikigai',
      author: 'Héctor García',
      price: 350,
      image: 'https://m.media-amazon.com/images/I/81l3rZK4lnL.jpg',
      rating: 4.5,
    },
    {
      id: 4,
      title: 'Think Like a Monk',
      author: 'Jay Shetty',
      price: 450,
      image: 'https://m.media-amazon.com/images/I/71g2ednj0JL.jpg',
      rating: 4.5,
    },
    {
      id: 5,
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      price: 299,
      image: 'https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg',
      rating: 4.5,
    },
    {
      id: 6,
      title: 'Deep Work',
      author: 'Cal Newport',
      price: 550,
      image: 'https://m.media-amazon.com/images/I/81gTwYAhU7L.jpg',
      rating: 4.5,
    },
    {
      id: 7,
      title: 'Rich Dad Poor Dad',
      author: 'Robert Kiyosaki',
      price: 399,
      image: 'https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg',
      rating: 4.5,
    },
    {
      id: 8,
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      price: 420,
      image: 'https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UY218_.jpg',
      rating: 4.5,
    },
    {
      id: 9,
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      price: 650,
      image: 'https://m.media-amazon.com/images/I/713jIoMO3UL.jpg',
      rating: 4.5,
    },
    {
      id: 10,
      title: 'Educated',
      author: 'Tara Westover',
      price: 499,
      image: 'https://m.media-amazon.com/images/I/81WojUxbbFL.jpg',
      rating: 4.5,
    },
    {
      id: 11,
      title: 'Becoming',
      author: 'Michelle Obama',
      price: 599,
      image: 'https://m.media-amazon.com/images/I/81h2gWPTYJL.jpg',
      rating: 4.5,
    },
    {
      id: 12,
      title: 'The Power of Habit',
      author: 'Charles Duhigg',
      price: 450,
      image: 'https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UY218_.jpg',
      rating: 4.5,
    },
  ];

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

  updateStock(
    bookId: number,
    bookTitle: string,
    newStock: number,
    resetInput: () => void
  ) {
    this.confirmAction(
      'Change Stock?',
      `Are you sure you want to set stock for "${bookTitle}" to ${newStock}?`,
      'Yes, update it!',
      () => {
        axios
          .post(`/api/books/${bookId}/update-stock`, { stock: newStock })
          .then(() =>
            Swal.fire('Updated!', 'Stock has been updated.', 'success')
          )
          .catch(() => {
            Swal.fire('Error!', 'Failed to update stock.', 'error');
            resetInput();
          });
      }
    );
  }

  // get all books api
  loadBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: () => {
        Swal.fire('Error!', 'Failed to fetch books.', 'error');
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

  async confirmDeleteUser(userId: string, userName: string) {
    const result = await Swal.fire({
      title: 'Delete User?',
      text: `Are you sure you want to delete user "${userName}"? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!',
    });

    if (result.isConfirmed) {
      this.users = this.users.filter((user) => user.id !== userId);
      Swal.fire('Deleted!', 'User has been deleted.', 'success');
    }
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
  

  // search api call
  ngOnInit() {

    // this.searchResults = [
    //   {
    //     id: 1,
    //     title: 'The Great Gatsby',
    //     author: 'F. Scott Fitzgerald',
    //     price: 299,
    //     image: 'https://via.placeholder.com/150x220?text=The+Great+Gatsby'
    //   },
    //   {
    //     id: 2,
    //     title: 'To Kill a Mockingbird',
    //     author: 'Harper Lee',
    //     price: 350,
    //     image: 'https://via.placeholder.com/150x220?text=To+Kill+a+Mockingbird'
    //   },
    //   {
    //     id: 3,
    //     title: '1984',
    //     author: 'George Orwell',
    //     price: 250,
    //     image: 'https://via.placeholder.com/150x220?text=1984'
    //   }
    // ];

    this.bookService.searchEvent$.subscribe((event) => {
      if (!event) return;

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
          next: (data) => (this.searchResults = data),
          error: () =>
            Swal.fire('Error!', 'Failed to fetch search results.', 'error'),
        });
      }
    });
  }
}
