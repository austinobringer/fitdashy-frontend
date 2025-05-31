import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AuthStorageService } from '../../../services/auth-storage.service';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ErrorBoxComponent } from "../../../../shared/components/error-box/error-box.component";
import { SuccessBoxComponent } from "../../../../shared/components/success-box/success-box.component";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ErrorBoxComponent, SuccessBoxComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  form: any = {};
  error: string | null = null
  success: string | null = null;

  constructor(private authService: AuthService, private authStorage: AuthStorageService, private router: Router) { }

  ngOnInit(): void {
    this.validateAccessToken(); // Check if the user is already authenticated

    // Get possible success message from router naviagtion state
    if (history.state && history.state.success) {
      this.success = history.state.success;
    }
  }

  async validateAccessToken(): Promise<void> {
    try {
      const data = await firstValueFrom(this.authService.validate());
      this.navigateToHome(); // Navigate to whatever the default page is if authenticated
    } catch (e) {}
  }

  async onSubmit(f: NgForm): Promise<void> {
    if (f.controls['username'].invalid) { // If the username is not valid
      this.setError('Username is required');
    } else if (f.controls['password'].invalid) { // If the password is not valid
      this.setError('Password is required');
    } else {
      try {
        const data = await firstValueFrom(this.authService.login(this.form));

        // If the login succeeded
        this.authStorage.saveUser(data);
        this.navigateToHome();
      } catch (e) {
        if (e instanceof HttpErrorResponse) {
          this.setError(e.error.message);
        } else {
          this.setError('An unexpected error ocurred');
        }
      }
    }
  }

  navigateToHome(): void {
    this.router.navigate(['']); // Navigate to whatever the default page is
  }

  setError(error: string): void {
    this.error = error;
    this.success = null; // Clear success message if there's an error
  }

  setSuccess(success: string): void {
    this.success = success;
    this.error = null; // Clear error message if there's a success
  }
}
