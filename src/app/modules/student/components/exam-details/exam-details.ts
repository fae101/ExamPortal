import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-exam-details',
  standalone: true,
  templateUrl: './exam-details.html',
  styleUrls: ['./exam-details.css'],
  imports: [RouterLink]
})
export class ExamDetails implements OnInit {
  examId = '';
  loading = true;
  examStarted = false;
  examCompleted = false;

  timeRemaining = 0;
  timerInterval: any;
  currentQuestionIndex = 0;

  exam = {
    id: 'exam123',
    title: 'Final Angular Exam',
    duration: 45,
    instructions: [
      'Each question is worth 1 point.',
      'Time limit is enforced.',
      'Do not refresh the page during the exam.'
    ],
    questions: [
      {
        id: 'q1',
        question: 'What does @if do in Angular?',
        options: ['Loops', 'Conditional rendering', 'Styling', 'Routing']
      },
      {
        id: 'q2',
        question: 'What is SignalInput used for?',
        options: ['Service calls', 'Event output', 'Input bindings', 'HTTP headers']
      }
    ]
  };

  userAnswers: { [questionId: string]: number } = {};

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('id') || '';
    this.timeRemaining = this.exam.duration * 60;
    this.loading = false;
  }

  startExam(): void {
    this.examStarted = true;
    this.startTimer();
  }

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
      } else {
        this.submitExam();
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  goToQuestion(index: number): void {
    this.currentQuestionIndex = index;
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.exam.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  selectAnswer(questionId: string, answerIndex: number): void {
    this.userAnswers[questionId] = answerIndex;
  }

  isQuestionAnswered(questionId: string): boolean {
    return questionId in this.userAnswers;
  }

  getAnsweredCount(): number {
    return Object.keys(this.userAnswers).length;
  }

  submitExam(): void {
    clearInterval(this.timerInterval);
    this.examStarted = false;
    this.examCompleted = true;
  }
}


// import { Component, signal, computed, inject, effect } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { StudentService, ExamDetail, SubmissionDTO } from '../../student.service';

// @Component({
//   selector: 'app-exam-details',
//   templateUrl: './exam-details.html',
//   styleUrls: ['./exam-details.css']
// })
// export class ExamDetailsComponent {
//   private route = inject(ActivatedRoute);
//   private router = inject(Router);
//   private studentService = inject(StudentService);

//   exam = signal<ExamDetail | null>(null);
//   loading = signal(true);
//   error = signal('');
//   answers = signal<{ [questionId: string]: number }>({});

//   constructor() {
//     const id = this.route.snapshot.paramMap.get('id');
//     if (id) this.loadExam(id);
//   }

//   loadExam(id: string) {
//     this.studentService.getExamDetails(id).subscribe({
//       next: data => {
//         this.exam.set(data);
//         this.loading.set(false);
//       },
//       error: () => {
//         this.error.set('Could not load exam.');
//         this.loading.set(false);
//       }
//     });
//   }

//   updateAnswer(qid: string, index: number) {
//     this.answers.update(a => ({ ...a, [qid]: index }));
//   }

//   submit() {
//     const examId = this.exam()?.id;
//     if (!examId) return;
//     const payload: SubmissionDTO = {
//       userId: localStorage.getItem('userId') || '',
//       answers: this.answers()
//     };

//     this.studentService.submitAnswers(examId, payload).subscribe({
//       next: () => this.router.navigate(['/student/submission-history']),
//       error: () => this.error.set('Submission failed.')
//     });
//   }
// }