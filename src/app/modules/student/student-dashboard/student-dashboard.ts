import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudentService } from '../student.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  templateUrl: './student-dashboard.html',
  styleUrls: ['./student-dashboard.css'],
  imports: [CommonModule, RouterLink]
})
export class StudentDashboard implements OnInit {
  stats = {
    available: 0,
    completed: 0,
    pending: 0,
    averageScore: 0
  };

  recentActivities: {
    type: string;
    icon: string;
    message: string;
    timestamp: string;
    score?: string;
    badge?: string;
  }[] = [];

  constructor(
    private studentService: StudentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadRecentActivity();
  }

  private loadStats(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    // Load available exams
    this.studentService.getPublishedExams().subscribe({
      next: (exams) => {
        this.stats.available = exams.length;
      },
      error: (err) => console.error('Failed to load available exams:', err)
    });

    // Load submission history for stats
    this.studentService.getSubmissionHistory(userId).subscribe({
      next: (subs) => {
        const graded = subs.filter((s: any) => s.result?.grade !== 'N/A');
        const totalScore = graded.reduce((acc: number, s: any) => acc + (s.result?.score || 0), 0);
        const totalPoints = graded.reduce((acc: number, s: any) => acc + (s.result?.totalPoints || 0), 0);

        this.stats.completed = graded.length;
        this.stats.pending = subs.length - graded.length;
        this.stats.averageScore = totalPoints ? Math.round((totalScore / totalPoints) * 100) : 0;
      },
      error: (err) => console.error('Failed to load stats:', err)
    });
  }

  private loadRecentActivity(): void {
    // Mock recent activities - you can replace this with real API data
    this.recentActivities = [
      {
        type: 'success',
        icon: '📊',
        message: 'You scored 85% on Mathematics Final',
        timestamp: '2 hours ago',
        score: '85%'
      },
      {
        type: 'success',
        icon: '🏅',
        message: 'You earned a B grade in Biology',
        timestamp: 'Yesterday',
        badge: 'Grade B'
      },
      {
        type: 'primary',
        icon: '📝',
        message: 'New exam available: Chemistry',
        timestamp: '3 days ago'
      }
    ];
  }
}