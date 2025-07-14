import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { } from '../student/components/exam-results/exam-results'; // Adjust the import path as necessary

// -- DTO Interfaces (can be split later into models if preferred) --
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
  private baseUrl = 'https://localhost:5240/api/student'; // Adjust to your API origin

  constructor(private http: HttpClient) {}

  /** Get all published exams */
  getPublishedExams(): Observable<ExamOverview[]> {
    return this.http.get<ExamOverview[]>(`${this.baseUrl}/exams`);
  }

  /** Get details of a specific exam including questions */
  getExamDetails(examId: string): Observable<ExamDetail> {
    return this.http.get<ExamDetail>(`${this.baseUrl}/exam/${examId}`);
  }

  /** Submit answers to a specific exam */
  submitAnswers(examId: string, payload: SubmissionDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/exam/${examId}/submit`, payload);
  }

    /** Get results for a specific exam */
  getResult(examId: string): Observable<Result> {
  return this.http.get<Result>(`/api/exams/${examId}/result`);
}

}
