import { Component, OnInit } from '@angular/core';

import { RouterLink, RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudentService } from '../student.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  templateUrl: './student-dashboard.html',
  styleUrls: ['./student-dashboard.css'],
  imports: [RouterLink, RouterOutlet]
})
export class StudentDashboard implements OnInit {
  user = {
    fullName: 'Farah Hassan',
    role: 'student',
    upcomingExams: 2,
    completedExams: 5
  };

  highlights = [
    {
      title: 'Angular Mastery',
      status: 'Upcoming',
      date: '2025-07-19',
      duration: '30 mins'
    },
    {
      title: 'RxJS Final Challenge',
      status: 'Completed',
      score: '94%',
      date: '2025-07-14'
    }
  ];

  ngOnInit(): void {}
}


// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterLink } from '@angular/router';
// import { StudentService } from '../../student/student.service';
// import { AuthService } from '../../../core/services/auth.service';

// @Component({
//   selector: 'app-student-dashboard',
//   standalone: true,
//   templateUrl: './student-dashboard.html',
//   styleUrls: ['./student-dashboard.css'],
//   imports: [CommonModule, RouterLink]
// })
// export class StudentDashboard implements OnInit {
//   stats = {
//     available: 0,
//     completed: 0,
//     pending: 0,
//     averageScore: 0
//   };

//   recentActivities: {
//     type: string;
//     icon: string;
//     message: string;
//     timestamp: string;
//     score?: string;
//     badge?: string;
//   }[] = [];

//   constructor(
//     private studentService: StudentService,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     const userId = localStorage.getItem('userId');
//     if (!userId) return;

//     this.loadStats(userId);
//     this.loadRecentActivity(userId);
//   }

//   private loadStats(userId: string): void {
//     // Example logic — replace with real API calls if available
//     this.studentService.getSubmissionHistory(userId).subscribe({
//       next: (subs) => {
//         const graded = subs.filter((s: any) => s.result?.grade !== 'N/A');
//         const totalScore = graded.reduce((acc: number, s: any) => acc + s.result.score, 0);
//         const totalPoints = graded.reduce((acc: number, s: any) => acc + s.result.totalPoints, 0);

//         this.stats.completed = graded.length;
//         this.stats.pending = subs.length - graded.length;
//         this.stats.available = subs.length; // Or use getPublishedExams for real-time
//         this.stats.averageScore = totalPoints ? Math.round((totalScore / totalPoints) * 100) : 0;
//       },
//       error: (err) => console.error('Failed to load stats:', err)
//     });
//   }

//   private loadRecentActivity(userId: string): void {
//     // Mock example — replace with API call if available
//     this.recentActivities = [
//       {
//         type: 'score',
//         icon: '📊',
//         message: 'You scored 85 on Mathematics Final',
//         timestamp: '2 hours ago',
//         score: '85%'
//       },
//       {
//         type: 'badge',
//         icon: '🏅',
//         message: 'You earned a B grade in Biology',
//         timestamp: 'Yesterday',
//         badge: 'Grade B'
//       },
//       {
//         type: 'info',
//         icon: '📝',
//         message: 'New exam available: Chemistry',
//         timestamp: '3 days ago'
//       }
//     ];
//   }
// }
=======
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