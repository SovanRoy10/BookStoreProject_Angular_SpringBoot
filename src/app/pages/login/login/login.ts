import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  imports: [CommonModule,FormsModule,RouterModule],
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  handleSubmit(event: Event) {
    event.preventDefault();
    console.log('Login attempt:', { email: this.email, password: this.password });
    // Later: call auth API, set user context, etc.
    this.router.navigate(['/']);
  }
}
