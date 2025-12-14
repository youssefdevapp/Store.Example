import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div style="max-width: 400px; margin: 50px auto; padding: 20px; background: white; border-radius: 8px;">
      <h2>Login</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Username:</label>
          <input type="text" [(ngModel)]="username" name="username" class="form-control" required>
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" [(ngModel)]="password" name="password" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
      @if (error) {
        <div style="color: red; margin-top: 10px;">{{ error }}</div>
      }
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      error: () => this.error = 'Invalid credentials'
    });
  }
}