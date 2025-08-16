import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  imports: [CommonModule, FormsModule]
})
export class Profile implements OnInit {
  user: any = null;

  isAdmin = false;

  name: string = '';
  email: string = '';
  role: string = '';
  avatar: string = '';
  password: string = '';

  // Keep static orders for now
  orderHistory = [
    { id: '#1001', bookTitle: 'Atomic Habits', date: '2025-07-01', price: 599, status: 'Delivered' },
    { id: '#1002', bookTitle: 'The Alchemist', date: '2025-07-15', price: 299, status: 'On the way' },
    { id: '#1003', bookTitle: 'Sapiens', date: '2025-08-01', price: 650, status: 'Pending' }
  ];

  constructor(private userService: UserService) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.loadProfile();
  }

  loadProfile() {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data;

        this.name = data.name;
        this.email = data.email;
        this.role = data.role;

        this.isAdmin = data.role === 'ADMIN';

        // generate avatar from user name
        this.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          data.name
        )}&background=random`;

      },
      error: (err) => {
        Swal.fire('Error!', 'Failed to load profile', 'error');
        console.error('Profile load error:', err);
      }
    });
  }

  handleSave() {
    Swal.fire({
      icon: 'info',
      title: 'Saving...',
      timer: 1000,
      showConfirmButton: false
    });

    console.log('Updated name:', this.name, 'Updated password:', this.password);
    // Later: API call to update profile
  }
}
