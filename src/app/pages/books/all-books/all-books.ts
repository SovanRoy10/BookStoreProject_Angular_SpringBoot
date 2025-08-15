import { Component, OnInit } from '@angular/core';
import { BookControls } from '../../../shared/book-controls/book-controls';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../services/book';
import Swal from 'sweetalert2';

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
  imports: [BookControls, CommonModule],
  selector: 'app-all-books',
  templateUrl: './all-books.html',
  styleUrl: './all-books.css',
})
export class AllBooks implements OnInit {
  loading = false;

  books: Book[] = [];
  originalBooks: Book[] = [];
  filters = {
    category: '',
    priceRange: [0, 1000],
    availability: '',
  };
  sortOption = '';

  constructor(private bookService: BookService) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.loadBooks();
  }

  loadBooks() {
    this.loading = true; // Show loader before API call

    this.bookService.getAllBooks().subscribe({
      next: (data: Book[]) => {
        this.originalBooks = data;
        this.applyFiltersAndSorting();
        this.loading = false; // Hide loader after success
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error!', 'Failed to fetch books.', 'error');
        this.loading = false; // Hide loader even if error
      },
    });
  }

  onFilterChange(newFilters: any) {
    this.filters = newFilters;
    this.applyFiltersAndSorting();
  }

  onSortChange(option: string) {
    this.sortOption = option;
    this.applyFiltersAndSorting();
  }

  private applyFiltersAndSorting() {
    let filtered = [...this.originalBooks];

    // Category filter
    if (this.filters.category) {
      filtered = filtered.filter(
        (b) => b.categoryName === this.filters.category
      );
    }
    // Availability filter
    if (this.filters.availability) {
      if (this.filters.availability === 'in-stock') {
        filtered = filtered.filter((b) => b.stockQuantity > 0);
      } else if (this.filters.availability === 'out-of-stock') {
        filtered = filtered.filter((b) => b.stockQuantity === 0);
      }
    }
    // Price filter
    filtered = filtered.filter(
      (b) =>
        b.price >= this.filters.priceRange[0] &&
        b.price <= this.filters.priceRange[1]
    );

    // Sorting
    if (this.sortOption === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.sortOption === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (this.sortOption === 'date-asc') {
      filtered.sort(
        (a, b) =>
          new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
      );
    } else if (this.sortOption === 'date-desc') {
      filtered.sort(
        (a, b) =>
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      );
    }

    this.books = filtered;
  }
}

// import { Component, OnInit } from '@angular/core';
// import { BookControls } from '../../../shared/book-controls/book-controls';
// import { CommonModule } from '@angular/common';
// import Swal from 'sweetalert2';

// export interface Book {
//   id: number;
//   title: string;
//   author: string;
//   price: number;
//   isbn: string;
//   publishDate: string;
//   categoryName: string;
//   stockQuantity: number;
//   description: string;
//   coverImageUrl: string;
// }

// @Component({
//   imports: [BookControls, CommonModule],
//   selector: 'app-all-books',
//   templateUrl: './all-books.html',
//   styleUrl: './all-books.css'
// })
// export class AllBooks implements OnInit {
//   books: Book[] = [];
//   originalBooks: Book[] = [];
//   filters = {
//     category: '',
//     priceRange: [0, 1000],
//     availability: ''
//   };
//   sortOption = '';

//   constructor() {}

//   ngOnInit() {
//     window.scrollTo(0, 0);
//     this.loadBooks();
//   }

//   loadBooks() {
//     try {
//       // Dummy data instead of API call
//       const dummyBooks: Book[] = [
//         {
//           id: 1,
//           title: 'The Great Gatsby',
//           author: 'F. Scott Fitzgerald',
//           price: 299,
//           isbn: '9780743273565',
//           publishDate: '1925-04-10',
//           categoryName: 'Classic Literature',
//           stockQuantity: 12,
//           description:
//             'A novel set in the Roaring Twenties, telling the story of Jay Gatsby and his unrequited love for Daisy Buchanan.',
//           coverImageUrl:
//             'https://www.bookswagon.com/productimages/images200/862/9780190635862.jpg'
//         },
//         {
//           id: 2,
//           title: '1984',
//           author: 'George Orwell',
//           price: 350,
//           isbn: '9780451524935',
//           publishDate: '1949-06-08',
//           categoryName: 'Dystopian',
//           stockQuantity: 0,
//           description:
//             'A chilling depiction of a totalitarian regime and a dystopian future.',
//           coverImageUrl:
//             'https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg'
//         },
//         {
//           id: 3,
//           title: 'To Kill a Mockingbird',
//           author: 'Harper Lee',
//           price: 400,
//           isbn: '9780060935467',
//           publishDate: '1960-07-11',
//           categoryName: 'Historical Fiction',
//           stockQuantity: 5,
//           description:
//             'A story of racial injustice and moral growth in the American South.',
//           coverImageUrl:
//             'https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg'
//         }
//       ];

//       this.originalBooks = dummyBooks;
//       this.applyFiltersAndSorting();
//     } catch (err) {
//       console.error(err);
//       Swal.fire('Error!', 'Failed to load books.', 'error');
//     }
//   }

//   onFilterChange(newFilters: any) {
//     this.filters = newFilters;
//     this.applyFiltersAndSorting();
//   }

//   onSortChange(option: string) {
//     this.sortOption = option;
//     this.applyFiltersAndSorting();
//   }

//   private applyFiltersAndSorting() {
//     let filtered = [...this.originalBooks];

//     // Category filter
//     if (this.filters.category) {
//       filtered = filtered.filter(b => b.categoryName === this.filters.category);
//     }
//     // Availability filter
//     if (this.filters.availability) {
//       if (this.filters.availability === 'in-stock') {
//         filtered = filtered.filter(b => b.stockQuantity > 0);
//       } else if (this.filters.availability === 'out-of-stock') {
//         filtered = filtered.filter(b => b.stockQuantity === 0);
//       }
//     }
//     // Price filter
//     filtered = filtered.filter(
//       b =>
//         b.price >= this.filters.priceRange[0] &&
//         b.price <= this.filters.priceRange[1]
//     );

//     // Sorting
//     if (this.sortOption === 'price-asc') {
//       filtered.sort((a, b) => a.price - b.price);
//     } else if (this.sortOption === 'price-desc') {
//       filtered.sort((a, b) => b.price - a.price);
//     } else if (this.sortOption === 'date-asc') {
//       filtered.sort(
//         (a, b) =>
//           new Date(a.publishDate).getTime() -
//           new Date(b.publishDate).getTime()
//       );
//     } else if (this.sortOption === 'date-desc') {
//       filtered.sort(
//         (a, b) =>
//           new Date(b.publishDate).getTime() -
//           new Date(a.publishDate).getTime()
//       );
//     }

//     this.books = filtered;
//   }
// }
