import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exam-details',
  standalone: true,
  templateUrl: './exam-details.html',
  styleUrls: ['./exam-details.css']
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
      'No page reload during exam.'
    ],
    questions: [
      {
        id: 'q1',
        question: 'What does @if do in Angular 20?',
        options: ['Loops', 'Conditional rendering', 'Styling', 'Routing']
      },
      {
        id: 'q2',
        question: 'Which decorator binds reactive signals from parent?',
        options: ['@ViewChild', '@Input', '@SignalInput', '@Output']
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
