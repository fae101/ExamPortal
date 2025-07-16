import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudentService } from '../../student/student.service';
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
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.loadStats(userId);
    this.loadRecentActivity(userId);
  }

  private loadStats(userId: string): void {
    // Example logic — replace with real API calls if available
    this.studentService.getSubmissionHistory(userId).subscribe({
      next: (subs) => {
        const graded = subs.filter((s: any) => s.result?.grade !== 'N/A');
        const totalScore = graded.reduce((acc: number, s: any) => acc + s.result.score, 0);
        const totalPoints = graded.reduce((acc: number, s: any) => acc + s.result.totalPoints, 0);

        this.stats.completed = graded.length;
        this.stats.pending = subs.length - graded.length;
        this.stats.available = subs.length; // Or use getPublishedExams for real-time
        this.stats.averageScore = totalPoints ? Math.round((totalScore / totalPoints) * 100) : 0;
      },
      error: (err) => console.error('Failed to load stats:', err)
    });
  }

  private loadRecentActivity(userId: string): void {
    // Mock example — replace with API call if available
    this.recentActivities = [
      {
        type: 'score',
        icon: '📊',
        message: 'You scored 85 on Mathematics Final',
        timestamp: '2 hours ago',
        score: '85%'
      },
      {
        type: 'badge',
        icon: '🏅',
        message: 'You earned a B grade in Biology',
        timestamp: 'Yesterday',
        badge: 'Grade B'
      },
      {
        type: 'info',
        icon: '📝',
        message: 'New exam available: Chemistry',
        timestamp: '3 days ago'
      }
    ];
  }
}
