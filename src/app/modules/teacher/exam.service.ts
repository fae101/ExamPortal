import { Injectable } from '@angular/core';

export interface Exam {
  id: string;
  examName: string;
  subject: string;
  date: Date;
  duration: number;
  status: 'Active' | 'Inactive' | 'Completed';
  questions: Question[];
  // Additional properties for compatibility
  name?: string;
  title?: string;
  description?: string;
  totalQuestions?: number;
  startDate?: Date;
  endDate?: Date;
}

export interface Question {
  text: string;
  options: string[];
  correctAnswer: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private exams: Exam[] = [
    {
      id: '001',
      examName: 'Mathematics Final',
      name: 'Mathematics Final',
      subject: 'Mathematics',
      date: new Date('2024-12-20T09:00:00'),
      duration: 120,
      status: 'Active',
      totalQuestions: 2,
      questions: [
        {
          text: 'What is 2 + 2?',
          options: ['3', '4', '5', '6'],
          correctAnswer: '1'
        },
        {
          text: 'What is the square root of 16?',
          options: ['2', '3', '4', '5'],
          correctAnswer: '2'
        }
      ]
    },
    {
      id: '002',
      examName: 'Physics Midterm',
      name: 'Physics Midterm',
      subject: 'Physics',
      date: new Date('2024-12-22T14:00:00'),
      duration: 90,
      status: 'Inactive',
      totalQuestions: 1,
      questions: [
        {
          text: 'What is the speed of light?',
          options: ['300,000 km/s', '150,000 km/s', '450,000 km/s', '600,000 km/s'],
          correctAnswer: '0'
        }
      ]
    },
    {
      id: '003',
      examName: 'Chemistry Quiz',
      name: 'Chemistry Quiz',
      subject: 'Chemistry',
      date: new Date('2024-12-25T10:00:00'),
      duration: 60,
      status: 'Active',
      totalQuestions: 1,
      questions: [
        {
          text: 'What is the chemical symbol for water?',
          options: ['H2O', 'CO2', 'O2', 'N2'],
          correctAnswer: '0'
        }
      ]
    },
    {
      id: '004',
      examName: 'Biology Test',
      name: 'Biology Test',
      subject: 'Biology',
      date: new Date('2024-12-28T11:00:00'),
      duration: 75,
      status: 'Inactive',
      totalQuestions: 1,
      questions: [
        {
          text: 'What is the powerhouse of the cell?',
          options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Cytoplasm'],
          correctAnswer: '1'
        }
      ]
    },
    {
      id: '005',
      examName: 'English Literature',
      name: 'English Literature',
      subject: 'English',
      date: new Date('2024-12-30T13:00:00'),
      duration: 100,
      status: 'Active',
      totalQuestions: 1,
      questions: [
        {
          text: 'Who wrote Romeo and Juliet?',
          options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
          correctAnswer: '1'
        }
      ]
    }
  ];

  getExams(): Exam[] {
    return [...this.exams];
  }

  addExam(exam: Exam): void {
    // Ensure compatibility properties are set
    exam.name = exam.examName;
    exam.totalQuestions = exam.questions.length;
    this.exams.push(exam);
  }

  getExamById(id: string): Exam | undefined {
    return this.exams.find(exam => exam.id === id);
  }

  updateExam(id: string, updatedExam: Partial<Exam>): boolean {
    const index = this.exams.findIndex(exam => exam.id === id);
    if (index !== -1) {
      this.exams[index] = { ...this.exams[index], ...updatedExam };
      return true;
    }
    return false;
  }

  deleteExam(id: string): boolean {
    const index = this.exams.findIndex(exam => exam.id === id);
    if (index !== -1) {
      this.exams.splice(index, 1);
      return true;
    }
    return false;
  }
}