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
  userAnswers: { [key: number]: string } = {};

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('id')!;
    this.loadExamDetails();
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
      }
    });
  }

  startExam(): void {
    this.examStarted = true;
    this.startTimer();
  }

  startTimer(): void {
    const timer = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        clearInterval(timer);
        this.submitExam();
      }
    }, 1000);
  }

  selectAnswer(questionId: number, answer: string): void {
    this.userAnswers[questionId] = answer;
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
    this.examCompleted = true;
 const payload: SubmissionDTO = {
  userId: 'student-id', // replace with actual value
  answers: Object.fromEntries(
    Object.entries(this.userAnswers).map(([key, value]) => [key.toString(), parseInt(value)])
  )
};

    this.studentService.submitAnswers(this.examId, payload).subscribe({
      next: () => console.log('Submitted successfully'),
      error: (err) => console.error('Submission failed:', err)
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

  isQuestionAnswered(id: number): boolean {
    return id in this.userAnswers;
  }
}
