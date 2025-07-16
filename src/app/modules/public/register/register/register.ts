import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, RegisterDTO, UserResponseDTO } from '../../../../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  form: FormGroup;
  strengthClass: string = '';
  requirements: Record<string, boolean> = {};

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      UserName: [
        '',
        [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9_]+$/)]
      ],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]],
      FullName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]
      ],
      CreatedAt: [new Date().toISOString()],
      Role: ['student']
    });

    this.form.controls['Password'].valueChanges.subscribe(password => {
      this.updatePasswordStrength(password ?? '');
    });
  }

  updatePasswordStrength(password: string) {
    const reqs = {
      length: password.length >= 8,
      special: /[_!@#$%^&*(),.?":{}|<>]/.test(password),
      number: /\d/.test(password),
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password)
    };

    this.requirements = reqs;

    const strength = Object.values(reqs).filter(x => x).length / 5;
    this.strengthClass = strength <= 0.4 ? 'weak'
                        : strength <= 0.6 ? 'fair'
                        : strength <= 0.8 ? 'good'
                        : 'strong';
  }

  submit() {
    if (this.form.valid) {
      const formData = this.form.value;

      const payload: RegisterDTO = {
        ...formData,
        Username: formData.UserName,       
        YourUserName: formData.UserName 
      };

      this.auth.register(payload).subscribe({
        next: (res: UserResponseDTO) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res));
          localStorage.setItem('userId', res.userId || 'temp-user-id');
          
          alert('Welcome, ' + res.user_name + ' 🎉');
          this.router.navigate(['/student']);
        },
        error: (err) => {
          alert('Registration failed: ' + err.message);
        }
      });
    } else {
      Object.values(this.form.controls).forEach(c => c.markAsTouched());
    }
  }
}