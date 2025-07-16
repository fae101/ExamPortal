import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, throwError } from 'rxjs';

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
  private apiUrl = 'http://localhost:5240/api/auth';

  private userSubject = new BehaviorSubject<UserResponseDTO | null>(this.getStoredUser());

  constructor(private http: HttpClient) {}

  /** Register new user */
  register(data: RegisterDTO): Observable<UserResponseDTO> {
    return this.http.post<UserResponseDTO>(`${this.apiUrl}/register`, data).pipe(
      catchError(err => {
        console.error('Registration error:', err);
        return throwError(() => new Error(err.error?.message || 'Registration failed'));
      })
    );
  }

  /** Login user */
  login(data: LoginDTO): Observable<UserResponseDTO> {
    return this.http.post<UserResponseDTO>(`${this.apiUrl}/login`, data).pipe(
      catchError(err => {
        console.error('Login error:', err);
        return throwError(() => new Error(err.error?.message || 'Login failed'));
      })
    );
  }

  /** Get currently logged-in user */
  getCurrentUser(): UserResponseDTO | null {
    return this.userSubject.value;
  }

  /** Set user manually and update localStorage */
  setUser(user: UserResponseDTO): void {
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', user.token);
  }

  /** Logout and clear session */
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }

  /** Helper: Load user from localStorage on init */
  private getStoredUser(): UserResponseDTO | null {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  }
  

}
