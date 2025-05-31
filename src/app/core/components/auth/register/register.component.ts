import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AuthStorageService } from '../../../services/auth-storage.service';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ErrorBoxComponent } from "../../../../shared/components/error-box/error-box.component";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, ErrorBoxComponent, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  form: any = {};
  error: string | null = null

  constructor(private authService: AuthService, private authStorage: AuthStorageService, private router: Router) { }

  ngOnInit(): void {
    this.validateAccessToken(); // Check if the user is already authenticated
  }

  async validateAccessToken(): Promise<void> {
    try {
      const data = await firstValueFrom(this.authService.validate());
      this.navigateToHome(); // Navigate to whatever the default page is if authenticated
    } catch (e) {}
  }

  async onSubmit(f: NgForm): Promise<void> {
    if (f.controls['username'].invalid) {
      this.error = 'Username is required';
    } else if (f.controls['password'].invalid) {
      this.error = 'Password is required';
    } else if (f.controls['confirmPassword'].invalid) {
      this.error = 'Password confirmation is required';
    } else if (f.controls['email'].invalid) {
      if (!f.controls['email'].value || f.controls['email'].value.trim() === '') {
        this.error = 'Email is required';
      } else {
        this.error = 'Email is not valid';
      }
    } else if (f.controls['fullname'].invalid) {
      this.error = 'Full name is required';
    } else if (f.controls['password'].value != f.controls['confirmPassword'].value) {
      this.error = 'Passwords do not match';
    } else {
      // Attempt to register the user
      try {
        const { confirmPassword, ...formToSend } = this.form; // Create a new object without the confirmPassword field
      
        const data = await firstValueFrom(this.authService.register(formToSend));
  
        // If the registration succeeded
        this.navigateToLoginWithSuccessMessage("Registration successful! You can now log in.");
      } catch (e) {
        if (e instanceof HttpErrorResponse) {
          if (e.error && typeof e.error === 'object') {
            if (e.error.message) {
              this.error = e.error.message;
            } else {
              // Handle errors with field validation
              const firstKey = Object.keys(e.error)[0];
              if (firstKey) {
                var capitalizedFirstKey: string = firstKey.charAt(0).toUpperCase() + firstKey.slice(1);
                this.error = `${capitalizedFirstKey}: ${e.error[firstKey]}`;
              } else {
                this.error = 'An unknown error occurred with registration';
              }
            }
          }
        } else {
          this.error = 'An unexpected error ocurred with registration';
        }
        return;
      }
    }
  }

  navigateToHome(): void {
    this.router.navigate(['']); // Navigate to whatever the default page is
  }

  navigateToLoginWithSuccessMessage(message: string): void {
    this.router.navigate(['/auth/login'], { state: { success: message } })
  }
}
