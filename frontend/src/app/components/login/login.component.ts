import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router : Router) {}

  async login() {
    try {
      const response = await this.authService.login(this.username, this.password);
      alert('Login successful!');
      console.log('Login response:', response);
      localStorage.setItem('jwttoken', response.token); 
      localStorage.setItem('username', this.username); // Store email in local storage
      this.router.navigate(['/blogs']);
    } catch (error) {
      alert('Login failed. Please try again.');
      console.error('Login error:', error);
    }
  }


}
