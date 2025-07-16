import { Component, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudentService, SubmissionHistory as SubmissionHistoryType } from '../../student.service';

interface Submission {
  id: string;
  examId: string;
  submittedAt: string;
  score: number;
  totalPoints: number;
  grade: string;
}

@Component({
  selector: 'app-submissions',
  standalone: true,
  imports: [DatePipe, DecimalPipe, RouterLink],
  templateUrl: './submission-history.html',
  styleUrls: ['./submission-history.css']
})
export class SubmissionHistory implements OnInit {
  submissions: Submission[] = [];
  loading = true;
  gradedCount = 0;
  averageScore = 0;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found');
      this.loading = false;
      return;
    }

    this.studentService.getSubmissionHistory(userId).subscribe({
      next: (data: SubmissionHistoryType[]) => {
        this.submissions = data.map(sub => ({
          id: sub.id,
          examId: sub.examId,
          submittedAt: sub.submittedAt,
          score: sub.result?.score ?? 0,
          totalPoints: sub.result?.totalPoints ?? 0,
          grade: sub.result?.grade ?? 'N/A'
        }));
        this.calculateStats();
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load submissions:', err);
        this.loading = false;
      }
    });
  }

  calculateStats(): void {
    const graded = this.submissions.filter(s => s.grade !== 'N/A');
    this.gradedCount = graded.length;

    const totalScore = graded.reduce((acc, s) => acc + s.score, 0);
    const totalPoints = graded.reduce((acc, s) => acc + s.totalPoints, 0);
    this.averageScore = totalPoints ? Math.round((totalScore / totalPoints) * 100) : 0;
  }

  getGradeColor(grade: string): string {
    return {
      A: '#10b981',
      B: '#3b82f6',
      C: '#f59e0b',
      D: '#f97316',
      F: '#ef4444'
    }[grade] || '#6b7280';
  }
}