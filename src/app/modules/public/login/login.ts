import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginDTO, UserResponseDTO } from '../../../core/services/auth.service';
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

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      UserName: [
        '',
        [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9_]+$/)]
      ],
      Password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      const payload: LoginDTO = {
        Username: this.form.value.UserName,
        Password: this.form.value.Password
      };

      this.auth.login(payload).subscribe({
        next: (res: UserResponseDTO) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res));
          localStorage.setItem('userId', res.userId || 'temp-user-id');
          
          alert('Welcome back, ' + res.user_name + ' 🎉');
          
          // Route based on role
          if (res.role?.toLowerCase() === 'student') {
            this.router.navigate(['/student']);
          } else if (res.role?.toLowerCase() === 'admin' || res.role?.toLowerCase() === 'teacher') {
            this.router.navigate(['/teacher']);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          alert('Login failed: ' + err.message);
        }
      });
    } else {
      Object.values(this.form.controls).forEach(c => c.markAsTouched());
    }
  }
}