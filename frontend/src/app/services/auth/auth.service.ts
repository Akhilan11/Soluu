import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = "http://localhost:5000/api/user";

  // 🔥 BehaviorSubject to track auth status
  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('jwttoken'));
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http : HttpClient) { }

  async signup(username: string, email: string, password: string) {
    try {
      const response = await axios.post(this.url + "/signup", { username, email, password });
      return response.data;
    } catch (error) {
      console.error("Error during signup:", error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await axios.post(this.url + "/login", { email, password });
      localStorage.setItem("jwttoken", response.data.token);
      localStorage.setItem("email", email); // Optional: Store email
      this.loggedIn.next(true); // ✅ Notify subscribers about login
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("jwttoken");
  }

  logout(): void {
    localStorage.removeItem("jwttoken");
    localStorage.removeItem("email");
    this.loggedIn.next(false); // ✅ Notify subscribers about logout
  }

  getToken(): string | null {
    return localStorage.getItem("jwttoken");
  }
}
