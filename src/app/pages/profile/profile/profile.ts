import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  imports: [CommonModule, FormsModule]
})
export class Profile {
  user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    joined: 'January 2024',
    orders: 5,
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random'
  };

  isAdmin = false;

  name: string = this.user.name;
  password: string = '';

  orderHistory = [
    { id: '#1001', bookTitle: 'Atomic Habits', date: '2025-07-01', price: 599, status: 'Delivered' },
    { id: '#1002', bookTitle: 'The Alchemist', date: '2025-07-15', price: 299, status: 'On the way' },
    { id: '#1003', bookTitle: 'Sapiens', date: '2025-08-01', price: 650, status: 'Pending' }
  ];

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  handleSave() {
    alert(`Name changed to: ${this.name}\nPassword changed to: ${this.password}`);
    // Later: API call to update
  }
}
