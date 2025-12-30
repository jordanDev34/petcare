import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = false;
  error: string | null = null;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;

    const value = this.form.getRawValue();

    this.auth
      .login({
        email: value.email!,
        password: value.password!,
      })
      .subscribe({
        next: () => {
          this.loading = false;
          // plus tard : this.auth.loadCurrentUser().subscribe()
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          console.error('Login error', err);
          this.loading = false;
          this.error = 'Email ou mot de passe incorrect.';
        },
      });
  }
}
