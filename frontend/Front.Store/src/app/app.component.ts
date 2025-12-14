import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <nav style="background: #333; padding: 1rem; color: white;">
      <div class="container" style="display: flex; justify-content: space-between; align-items: center;">
        <h1>Store</h1>
        <div>
          @if (authService.isAuthenticated()) {
            <a routerLink="/clients" style="color: white; margin-right: 1rem;">Clients</a>
            <a routerLink="/orders" style="color: white; margin-right: 1rem;">Orders</a>
            <button (click)="logout()" class="btn btn-danger">Logout</button>
          } @else {
            <a routerLink="/login" style="color: white;">Login</a>
          }
        </div>
      </div>
    </nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}