import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleCasePipe, DatePipe, NgClass } from '@angular/common';




interface Exam {
  id: string;
  title: string;
  description: string;
  duration: number;
  totalQuestions?: number;
  startDate?: Date;
  endDate?: Date;
  status: 'upcoming' | 'active' | 'completed' | 'expired';
}

@Component({
  selector: 'app-exams-list',
  standalone: true,
  imports: [CommonModule,TitleCasePipe, DatePipe, NgClass],
  templateUrl: './exams-list.html',
  styleUrls: ['./exams-list.css']
})
export class ExamsList implements OnInit {
  exams: any[] = [];

  ngOnInit() {
    this.loadExams();
  }

  loadExams() {
    // Mock data for now
    this.exams = [
      { id: 1, name: 'Math Test', subject: 'Mathematics', date: new Date(), duration: 60 },
      { id: 2, name: 'Science Quiz', subject: 'Science', date: new Date(), duration: 45 }
    ];
  }

  editExam(id: number) {
    console.log('Edit exam:', id);
  }

  deleteExam(id: number) {
    console.log('Delete exam:', id);
  }
}
