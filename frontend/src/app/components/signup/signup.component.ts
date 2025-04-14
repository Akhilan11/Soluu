import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  username : string = '';
  email : string = '';
  password : string = '';

  constructor(private authService: AuthService) {}

  async signup() {
    try {
      const response = await this.authService.signup(this.username, this.email, this.password);
      alert('Signup successful!');
    } catch (error) {
      alert('Signup failed. Please try again.');
      console.error('Signup error:', error);
    }
  }

}
