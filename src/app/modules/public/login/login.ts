import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, UserResponseDTO } from '../../../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [ReactiveFormsModule, RouterLink]
})
export class Login {
  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      Username: [
        '',
        [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9_]+$/)]
      ],
      Password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      this.loading = true;
      const payload = this.form.value;

      this.auth.login(payload).subscribe({
        next: (res: UserResponseDTO) => {
          // Store additional user info
          localStorage.setItem('userId', res.userId || 'temp-user-id');
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res));
          
          alert('Welcome Back, ' + res.user_name + ' 🎉');

          // Route based on role
          switch (res.role?.toLowerCase()) {
            case 'student':
              this.router.navigate(['/student']);
              break;
            case 'teacher':
            case 'admin':
              this.router.navigate(['/teacher/dashboard']);
              break;
            default:
              this.router.navigate(['/']);
              break;
          }
          this.loading = false;
        },
        error: (err) => {
          alert('Login failed: ' + err.message);
          this.loading = false;
        }
      });
    } else {
      Object.values(this.form.controls).forEach(c => c.markAsTouched());
    }
  }
}