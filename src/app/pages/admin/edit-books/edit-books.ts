import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  isbn: string;
  publishDate: string;
  category: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-books.html',
  styleUrl: './edit-books.css'
})
export class EditBooks implements OnInit {
  book: Book | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';

    // Simulate API fetch
    setTimeout(() => {
      this.book = {
        id,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        price: 299,
        isbn: '9780743273565',
        publishDate: '1925-04-10',
        category: 'Classic Literature',
        description: 'A novel set in the Roaring Twenties...',
        image: 'https://www.bookswagon.com/productimages/images200/862/9780190635862.jpg'
      };
    }, 300);
  }

  handleSave(): void {
    Swal.fire({
      title: 'Save Changes?',
      text: 'This will update the book details permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!'
    }).then(result => {
      if (result.isConfirmed && this.book) {
        console.log('Updated book:', this.book);
        Swal.fire('Updated!', 'Book details have been saved.', 'success');
        this.router.navigate(['/admin']);
      }
    });
  }

  handleCancel(): void {
    this.router.navigate(['/admin']);
  }
}
