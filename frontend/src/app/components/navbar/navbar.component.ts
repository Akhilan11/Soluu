import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLoggedIn: boolean = false;
  username: string | null = localStorage.getItem('email') || 'Anonymous';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status; // Update the login status based on BehaviorSubject
      this.username = localStorage.getItem('email') || 'Anonymous'; // Update username
    }) // Check login status on component initialization
  }

  logout(): void {
    this.authService.logout(); // this will trigger the subscription to update UI
    alert('Logged out successfully!');
  }


}
