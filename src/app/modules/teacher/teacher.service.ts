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
export interface Exam {
  id: string;
  examName: string;
  subject: string;
  date: string;
  duration: number;
  status: 'active' | 'draft' | 'completed' | 'expired';
  // Add other properties based on your backend model
}

@Injectable({
  providedIn: 'root' // or scoped within the TeacherModule if preferred
})
export class TeacherService {
  private baseUrl = 'http://localhost:5240/api'; // update this as needed

  constructor(private http: HttpClient) {}

  getAllExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(`${this.baseUrl}/exam`);
  }
  
  // 🔍 Fetch all enrolled students
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/students`);
  }

  // 🧠 Optionally: Fetch individual student profile
  getStudentById(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/students/${id}`);
  }

  // 🧪 Optionally: Fetch performance stats or exams taken
  getStudentPerformance(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/students/${id}/performance`);
  }
}
