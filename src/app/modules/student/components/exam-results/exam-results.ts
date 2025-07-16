import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgClass, TitleCasePipe } from '@angular/common';
import { StudentService, Result } from '../../student.service';

@Component({
  selector: 'app-exam-results',
  standalone: true,
  imports: [NgClass, TitleCasePipe, RouterLink],
  templateUrl: './exam-results.html',
  styleUrls: ['./exam-results.css']
})
export class ExamResults implements OnInit {
  examId: string = '';
  result: Result | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('id')!;
    this.fetchResults();
  }

  fetchResults(): void {
    this.studentService.getResult(this.examId).subscribe({
      next: (data) => {
        this.result = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Result loading error:', err);
        this.loading = false;
        alert('Failed to load exam results');
      }
    });
  }

  getScorePercentage(): number {
    if (!this.result) return 0;
    return Math.round((this.result.score / this.result.totalPoints) * 100);
  }

  getGradeColor(): string {
    const grade = this.result?.grade || '';
    return {
      A: '#10b981',
      B: '#3b82f6',
      C: '#f59e0b',
      D: '#f97316',
      F: '#ef4444'
    }[grade] || '#9ca3af';
  }
}