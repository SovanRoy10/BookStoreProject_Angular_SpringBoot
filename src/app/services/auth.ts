import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'https://api.example.com/api/auth'; // change to your API
  private authState = new BehaviorSubject<boolean>(this.hasTokens());
  isAuthenticated$ = this.authState.asObservable();

  constructor(private http: HttpClient) {}

  // ===== API Calls =====
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  register(data: any): Observable<any> {
    // return this.http.post(`${this.apiUrl}/register`, data);
    return this.http.post(`https://dummyjson.com/c/5b41-ae18-4d24-92cd`, data);
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.http.post(`${this.apiUrl}/refresh`, { refreshToken });
  }

  // ===== Token Handling =====
  saveTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    this.authState.next(true);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.authState.next(false);
  }

  private hasTokens(): boolean {
    return !!localStorage.getItem('accessToken') && !!localStorage.getItem('refreshToken');
  }
}
