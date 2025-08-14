import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class User {
  private apiUrl = 'https://api.example.com/users'; // change to your API

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  updateProfile(profileData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, profileData);
  }

  getAllAdmins(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admins`);
  }

  addAdmin(adminData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/admins`, adminData);
  }

  removeAdmin(adminId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admins/${adminId}`);
  }
}
