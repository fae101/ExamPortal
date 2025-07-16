// import { Component, signal, computed } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { StudentService, Result } from '../../student.service';

// @Component({
//   selector: 'app-exam-result',
//   templateUrl: './exam-results.html',
//   styleUrls: ['./exam-results.css']
// })
// export class ExamResultComponent {
//   result = signal<Result | null>(null);
//   loading = signal(true);
//   error = signal('');

//   constructor(private studentService: StudentService, private route: ActivatedRoute) {
//     const examId = this.route.snapshot.paramMap.get('examId') || '';
//     this.studentService.getResult(examId).subscribe({
//       next: res => {
//         this.result.set(res);
//         this.loading.set(false);
//       },
//       error: () => {
//         this.error.set('Could not load exam result.');
//         this.loading.set(false);
//       }
//     });
//   }

//   scorePercentage = computed(() => {
//     const res = this.result();
//     return res ? Math.round((res.score / res.totalPoints) * 100) : 0;
//   });

//   gradeColor = computed(() => {
//     const grade = this.result()?.grade.toLowerCase() || '';
//     switch (grade) {
//       case 'a': return '#10b981'; // Green
//       case 'b': return '#3b82f6'; // Blue
//       case 'c': return '#facc15'; // Yellow
//       case 'd': return '#f97316'; // Orange
//       case 'f': return '#ef4444'; // Red
//       default: return '#9ca3af'; // Gray
//     }
//   });
// }
import { Component, OnInit } from '@angular/core';
import {  RouterLink } from '@angular/router';

@Component({
  selector: 'app-exam-result',
  standalone: true,
  templateUrl: './exam-results.html',
  styleUrls: ['./exam-results.css'],
  imports: [RouterLink]
})
export class ExamResult implements OnInit {
  result = {
    score: 90,
    totalPoints: 100,
    correct: 9,
    incorrect: 1,
    duration: 37,
    grade: 'A',
    breakdown: [
      {
        question: 'What does @if do?',
        yourAnswer: '@if',
        correctAnswer: '@if',
        points: 1,
        isCorrect: true
      },
      {
        question: 'What does SignalInput decorate?',
        yourAnswer: 'Input bindings',
        correctAnswer: 'Input bindings',
        points: 1,
        isCorrect: true
      }
    ]
  };

  ngOnInit(): void {}
}
