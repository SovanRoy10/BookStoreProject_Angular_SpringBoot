import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  isLoggedIn = false; // Replace with AuthService later
  cartCount = 1; // Replace with CartService later
  isAdmin = false; // Replace with actual role check later


  searchType = 'title';
  searchQuery = '';

  constructor(private bookService: BookService) {}

  onSearch() {
    if (this.searchQuery.trim()) {
      this.bookService.triggerSearch(this.searchType, this.searchQuery);
    }
  }
}

