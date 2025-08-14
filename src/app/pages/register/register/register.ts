import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  imports: [FormsModule,CommonModule,RouterModule],
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  formData = {
    name: '',
    email: '',
    password: '',
    role: 'user'
  };

  constructor(private router: Router) {}

  handleSubmit(event: Event) {
    event.preventDefault();
    console.log('Registration data:', this.formData);
    // TODO: API call for registration
    this.router.navigate(['/']);
  }
}
