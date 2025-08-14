import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  isLoggedIn = false; // Replace with AuthService later
  cartCount = 1;     // Replace with CartService later
  isAdmin = true;    // Replace with actual role check later
}
