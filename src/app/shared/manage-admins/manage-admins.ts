import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Admin {
  id: number;
  email: string;
  password: string;
}

@Component({
  selector: 'app-manage-admins',
  templateUrl: './manage-admins.html',
  styleUrl: './manage-admins.css',
  imports: [CommonModule, FormsModule],
})
export class ManageAdminsComponent implements OnInit {
  admins: Admin[] = [];
  email = '';
  password = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Dummy data
    this.admins = [
      { id: 1, email: 'admin1@example.com', password: 'pass123' },
      { id: 2, email: 'admin2@example.com', password: 'admin456' },
      { id: 3, email: 'admin3@example.com', password: 'secret789' }
    ];

    // Uncomment for backend
    // this.http.get<Admin[]>('/api/admins').subscribe(data => this.admins = data);
  }

  addAdmin(): void {
    if (!this.email.trim() || !this.password.trim()) {
      Swal.fire('Error', 'Email and password are required!', 'error');
      return;
    }

    const newAdmin: Admin = {
      id: this.admins.length ? this.admins[this.admins.length - 1].id + 1 : 1,
      email: this.email,
      password: this.password
    };

    // Uncomment for backend
    // this.http.post('/api/admins', newAdmin).subscribe(() => { ... });

    // Dummy mode
    this.admins.push(newAdmin);
    this.email = '';
    this.password = '';
    Swal.fire('Added!', 'New admin has been added.', 'success');
  }

  deleteAdmin(id: number): void {
    Swal.fire({
      title: 'Delete Admin?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete!'
    }).then(result => {
      if (result.isConfirmed) {
        // Uncomment for backend
        // this.http.delete(`/api/admins/${id}`).subscribe(() => { ... });

        // Dummy mode
        this.admins = this.admins.filter(a => a.id !== id);
        Swal.fire('Deleted!', 'Admin has been removed.', 'success');
      }
    });
  }
}
