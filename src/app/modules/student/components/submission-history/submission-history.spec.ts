// import { Component, OnInit } from '@angular/core';
// import {  DatePipe } from '@angular/common';
// import { RouterLink } from '@angular/router';
// import { StudentService } from '../../student.service';
// import { AuthService } from 'src/app/core/services/auth.service';

// interface Submission {
//   id: string;
//   examTitle: string;
//   submittedAt: string; // ISO date
//   score: number;
//   totalPoints: number;
//   grade: string;
//   status: 'graded' | 'pending';
// }

// @Component({
//   selector: 'app-submissions',
//   standalone: true,
//   imports: [ DatePipe, RouterLink],
//   templateUrl: './submissions.component.html',
//   styleUrls: ['./submissions.component.css']
// })
// export class Submissions implements OnInit {
//   submissions: Submission[] = [];
//   loading = true;

//   constructor(
//     private studentService: StudentService,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     const userId = this.authService.getUserId();
//     this.studentService.getSubmissionHistory(userId).subscribe({
//       next: (data) => {
//         this.submissions = data;
//         this.loading = false;
//       },
//       error: (err) => {
//         console.error('Failed to load submissions:', err);
//         this.loading = false;
//       }
//     });
//   }

//   getGradeColor(grade: string): string {
//     return {
//       A: '#10b981',
//       B: '#3b82f6',
//       C: '#f59e0b',
//       D: '#f97316',
//       F: '#ef4444'
//     }[grade] || '#9ca3af';
//   }
// }
