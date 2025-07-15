import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface RegisterDTO {
  UserName: string;
  Email: string;
  Password: string;
  FullName: string;
  CreatedAt: string;
  YourUserName: string;
  Role: string;
}

export interface LoginDTO {
  UserName: string;
  Password: string;
}

export interface UserResponseDTO {
  fullName: string;
  user_name: string;
  email: string;
  password: string;
  role: string;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5240/api/auth'; // adjust path if needed

  constructor(private http: HttpClient) {}

  register(data: RegisterDTO): Observable<UserResponseDTO> {
    return this.http.post<UserResponseDTO>(`${this.apiUrl}/register`, data)
      .pipe(
        catchError(err => {
          console.error('Registration error:', err);
          return throwError(() => new Error(err.error?.message || 'Registration failed'));
        })
      );
  }

  login(data: LoginDTO): Observable<UserResponseDTO> {
    return this.http.post<UserResponseDTO>(`${this.apiUrl}/login`, data)
      .pipe(
        catchError(err => {
          console.error('Login error:', err);
          return throwError(() => new Error(err.error?.message || 'Login failed'));
        })
      );
  }
}
