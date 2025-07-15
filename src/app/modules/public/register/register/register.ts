import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      UserName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z0-9_]+$/)
        ]
      ],
      Email: [
        '',
        [Validators.required, Validators.email]
      ],
      Password: ['', [Validators.required]],
      FullName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z\s]+$/)
        ]
      ],
      CreatedAt: ['', Validators.required],
      Role: ['', Validators.required]
    });

    //  Trigger password strength checker when password changes
    this.form.controls['Password'].valueChanges.subscribe(password => {
      this.updatePasswordStrength(password ?? '');
    });
  }

  updatePasswordStrength(password: string) {
    const reqs = {
      length: password.length >= 8,
      special: /[_!@#$%^&*(),.?":{}|<>]/.test(password),
      number: /[0-9]/.test(password),
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password)
    };

    this.requirements = reqs;

    const met = Object.values(reqs).filter(x => x).length;
    const strength = met / 5;

    this.strengthClass = strength <= 0.4 ? 'weak'
                      : strength <= 0.6 ? 'fair'
                      : strength <= 0.8 ? 'good'
                      : 'strong';
  }

  submit() {
    if (this.form.valid) {
      console.log('Sign Up Successfully!', this.form.value);
      alert('🎉 Registered Successfully!\n\n' + JSON.stringify(this.form.value, null, 2));
    } else {
      Object.values(this.form.controls).forEach(control => control.markAsTouched());
    }
  }

  showLoginMessage() {
    alert('You will be redirected to the login page');
  }
}
