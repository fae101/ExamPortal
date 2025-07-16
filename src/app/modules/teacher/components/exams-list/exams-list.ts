import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleCasePipe, DatePipe, NgClass } from '@angular/common';
import { ExamService } from '../../exam.service';

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
  imports: [CommonModule, TitleCasePipe, DatePipe, NgClass],
  templateUrl: './exams-list.html',
  styleUrls: ['./exams-list.css']
})
export class ExamsList implements OnInit {
  exams: any[] = [];
  private examService = inject(ExamService);

  ngOnInit() {
    this.loadExams();
  }

  loadExams() {
    // Get exams from service and transform to match your interface
    const serviceExams = this.examService.getExams();
    this.exams = serviceExams.map(exam => ({
      id: exam.id,
      name: exam.examName || exam.name,
      subject: exam.subject,
      date: exam.date,
      duration: exam.duration,
      totalQuestions: exam.totalQuestions || exam.questions.length,
      status: this.mapStatus(exam.status)
    }));
  }

  private mapStatus(serviceStatus: string): 'upcoming' | 'active' | 'completed' | 'expired' {
    switch (serviceStatus) {
      case 'Active':
        return 'active';
      case 'Completed':
        return 'completed';
      case 'Inactive':
        return 'expired';
      case 'Draft':
        return 'upcoming';
      default:
        return 'upcoming';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active':
        return 'active';
      case 'upcoming':
        return 'draft';
      case 'completed':
        return 'completed';
      case 'expired':
        return 'expired';
      default:
        return 'draft';
    }
  }

  editExam(id: string | number) {
    console.log('Edit exam:', id);
    // You can navigate to edit page here
  }

  deleteExam(id: string | number) {
    if (confirm('Are you sure you want to delete this exam?')) {
      const success = this.examService.deleteExam(String(id));
      if (success) {
        this.loadExams(); // Refresh the list
        alert('Exam deleted successfully!');
      } else {
        alert('Failed to delete exam.');
      }
    }
  }

  // Optional: Add method to create new exam
  createNewExam() {
    // Navigate to create exam page
    console.log('Navigate to create exam');
  }
}