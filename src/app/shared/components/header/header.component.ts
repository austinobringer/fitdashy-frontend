import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthStorageService } from '../../../core/services/auth-storage.service'; 
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private authStorage: AuthStorageService, private authService: AuthService,
              private router: Router) {}

  logout() {
    this.authStorage.logout();
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Logout failed', err);
      }
    });
  }
}
