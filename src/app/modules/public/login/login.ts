import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit() {
  if (this.form.valid) {
    const btn = document.getElementById('submitBtn') as HTMLButtonElement;
    const text = btn.querySelector('.button-text');
    if (text) text.innerHTML = '<span class="loading-spinner"></span> Signing In...';
    btn.disabled = true;

    setTimeout(() => {
      alert('Login successful! (This is a demo)');
      if (text) text.textContent = 'Sign In';
      btn.disabled = false;
    }, 2000);

    console.log('Login data:', this.form.value);
  } else {
    Object.values(this.form.controls).forEach(control => control.markAsTouched());
  }
}

}
