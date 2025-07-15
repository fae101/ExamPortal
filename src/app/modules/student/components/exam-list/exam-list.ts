import { Component, OnInit } from '@angular/core';
import { TitleCasePipe, DatePipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { StudentService } from '../../student.service';

interface Exam {
  id: string;
  title: string;
  description: string;
  duration: number;
  totalQuestions?: number;
  startDate?: Date;
  endDate?: Date;
  status: 'upcoming' | 'active' | 'completed' | 'expired';
}

@Component({
  selector: 'app-exam-list',
  standalone: true,
  imports: [TitleCasePipe, DatePipe, NgClass],
  templateUrl: './exam-list.html',
  styleUrls: ['./exam-list.css']
})
export class ExamList implements OnInit {
  exams: Exam[] = [];
  loading = true;

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.loading = true;

  this.studentService.getPublishedExams().subscribe({
    next: (data) => {
      this.exams = data.map((exam) => ({
        ...exam,
        duration: exam.durationMinutes || 90, // default or derive if missing
        status: 'active' // or calculate status based on time logic
      }));
      this.loading = false;
    },
    error: (err) => {
      console.error('Exam loading error:', err);
      this.loading = false;
    }
  });
}


  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  startExam(examId: string): void {
    this.router.navigate(['/student/exams', examId]);
  }

  viewResults(examId: string): void {
    this.router.navigate(['/student/results', examId]);
  }
}
