import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
  id: string;
  fullName: string;
  email: string;
  enrolledDate: string;
  totalExams: number;
  averageScore: number;
}

@Injectable({
  providedIn: 'root' // or scoped within the TeacherModule if preferred
})
export class TeacherService {
  private baseUrl = '/api/teacher'; // update this as needed

  constructor(private http: HttpClient) {}

  // Fetch all enrolled students
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/students`);
  }

  //  Optionally: Fetch individual student profile
  getStudentById(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/students/${id}`);
  }

  //  Optionally: Fetch performance stats or exams taken
  getStudentPerformance(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/students/${id}/performance`);
  }
}
