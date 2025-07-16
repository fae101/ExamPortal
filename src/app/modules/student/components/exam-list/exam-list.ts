import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService, ExamOverview } from '../../student.service';

@Component({
  selector: 'app-exam-list',
  standalone: true,
  templateUrl: './exam-list.html',
  styleUrls: ['./exam-list.css']
})
export class ExamList implements OnInit {
  exams: ExamOverview[] = [];
  loading: boolean = true;

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchExams();
  }

  fetchExams(): void {
    this.studentService.getPublishedExams().subscribe({
      next: (data) => {
        this.exams = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading exams:', err);
        this.loading = false;
      }
    });
  }

  startExam(examId: string): void {
    this.router.navigate(['/student/exam', examId]);
  }

//   // Optional placeholder for future status support or styling
//   getStatusClass(status: string): string {
//     return {
//       active: 'status-active',
//       upcoming: 'status-upcoming',
//       completed: 'status-completed',
//       expired: 'status-expired'
//     }[status] || 'status-default';
//   }
}
