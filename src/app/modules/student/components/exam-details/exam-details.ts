import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StudentService, SubmissionDTO } from '../../student.service';

@Component({
  selector: 'app-exam-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './exam-details.html',
  styleUrls: ['./exam-details.css']
})
export class ExamDetails implements OnInit {
  examId: string = '';
  exam: any = null;
  loading = true;
  timeRemaining = 0;
  examStarted = false;
  examCompleted = false;
  currentQuestionIndex = 0;
  userAnswers: { [key: string]: number } = {};
  timer: any;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('id')!;
    this.loadExamDetails();
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  loadExamDetails(): void {
    this.loading = true;
    this.studentService.getExamDetails(this.examId).subscribe({
      next: (data) => {
        this.exam = data;
        this.timeRemaining = data.durationMinutes * 60;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load exam:', err);
        this.loading = false;
        alert('Failed to load exam details');
      }
    });
  }

  startExam(): void {
    this.examStarted = true;
    this.startTimer();
  }

  startTimer(): void {
    this.timer = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        clearInterval(this.timer);
        this.submitExam();
      }
    }, 1000);
  }

  selectAnswer(questionId: string, answerIndex: number): void {
    this.userAnswers[questionId] = answerIndex;
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < (this.exam?.questions.length || 0) - 1) {
      this.currentQuestionIndex++;
    }
  }

  goToQuestion(index: number): void {
    this.currentQuestionIndex = index;
  }

  submitExam(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User not found. Please login again.');
      return;
    }

    const payload: SubmissionDTO = {
      userId: userId,
      examId: this.examId,
      answers: this.userAnswers
    };

    this.studentService.submitAnswers(this.examId, payload).subscribe({
      next: (response) => {
        console.log('Submitted successfully:', response);
        this.examCompleted = true;
        alert('Exam submitted successfully!');
      },
      error: (err) => {
        console.error('Submission failed:', err);
        alert('Failed to submit exam. Please try again.');
      }
    });
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  getAnsweredCount(): number {
    return Object.keys(this.userAnswers).length;
  }

  isQuestionAnswered(id: string): boolean {
    return id in this.userAnswers;
  }
}