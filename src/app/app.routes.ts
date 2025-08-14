import { Routes } from '@angular/router';

import { Home } from './pages/home/home/home';
import { BookDetail } from './pages/book-detail/book-detail/book-detail';
import { Login } from './pages/login/login/login'; 
import { Register } from './pages/register/register/register';
import { Cart } from './pages/cart/cart/cart';
import { Profile } from './pages/profile/profile/profile';
import { AllBooks } from './pages/books/all-books/all-books';
import { RecommendedBooks } from './pages/books/recommended-books/recommended-books';
import { TrendingBooks } from './pages/books/trending-books/trending-books';
import { EditBooks } from './pages/admin/edit-books/edit-books';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'book/:id', component: BookDetail },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'cart', component: Cart },
  { path: 'profile', component: Profile },
  { path: 'books/all', component: AllBooks },
  { path: 'books/recommended', component: RecommendedBooks },
  { path: 'books/trending', component: TrendingBooks },
  
  { path: 'admin/edit-book/:id', component: EditBooks },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // wildcard route
];
