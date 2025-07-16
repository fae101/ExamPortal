import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ExamOverview {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
}

export interface ExamDetail {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  questions: Question[];
}

export interface AnswerPayload {
  [questionId: string]: number;
}

export interface SubmissionDTO {
  userId: string;
  answers: AnswerPayload;
}

export interface Result {
  score: number;
  totalPoints: number;
  correct: number;
  incorrect: number;
  duration: number;
  grade: string;
  breakdown: Array<{
    question: string;
    yourAnswer: string;
    correctAnswer: string;
    points: number;
    isCorrect: boolean;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:5240/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  /** Get all published exams */
  getPublishedExams(): Observable<ExamOverview[]> {
    return this.http.get<ExamOverview[]>(
      `${this.baseUrl}/student/exams`,
      { headers: this.getAuthHeaders() }
    );
  }

  /** Get details of a specific exam */
  getExamDetails(examId: string): Observable<ExamDetail> {
    return this.http.get<ExamDetail>(
      `${this.baseUrl}/student/exam/${examId}`,
      { headers: this.getAuthHeaders() }
    );
  }

  /** Submit answers to an exam */
  submitAnswers(examId: string, payload: SubmissionDTO): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/student/exam/${examId}/submit`,
      payload,
      { headers: this.getAuthHeaders() }
    );
  }

  /** Get results for a specific exam */
  getResult(examId: string): Observable<Result> {
    return this.http.get<Result>(
      `${this.baseUrl}/submission/result/${examId}`,
      { headers: this.getAuthHeaders() }
    );
  }

  /** Get all submissions by user */
  getSubmissionHistory(userId: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/submission/user/${userId}`,
      { headers: this.getAuthHeaders() }
    );
  }
}
