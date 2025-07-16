import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-exam-list',
  standalone: true,
  templateUrl: './exam-list.html',
  styleUrls: ['./exam-list.css'],
  imports: [CommonModule, RouterLink]
})
export class ExamList implements OnInit {
  exams = [
    {
      id: 'exam1',
      title: 'Angular Basics',
      description: 'Test your foundational Angular knowledge.',
      durationMinutes: 30
    },
    {
      id: 'exam2',
      title: 'RxJS Challenge',
      description: 'Tackle reactive patterns and observables.',
      durationMinutes: 45
    }
  ];

  ngOnInit(): void {}
}

// import { Component, effect, signal } from '@angular/core';
// import { StudentService, ExamOverview } from '../../student.service';

// @Component({
//   selector: 'app-exam-list',
//   templateUrl: './exam-list.html',
//   styleUrls: ['./exam-list.css']
// })
// export class ExamListComponent {
//   exams = signal<ExamOverview[] | null>(null);
//   loading = signal(true);
//   error = signal('');

//   constructor(private studentService: StudentService) {
//     this.fetchExams();
//   }

//   fetchExams() {
//     this.studentService.getPublishedExams().subscribe({
//       next: data => {
//         this.exams.set(data);
//         this.loading.set(false);
//       },
//       error: () => {
//         this.error.set('Failed to load exams.');
//         this.loading.set(false);
//       }
//     });
//   }
// }