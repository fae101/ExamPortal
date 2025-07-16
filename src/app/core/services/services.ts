// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-services',
//   imports: [],
//   templateUrl: './services.html',
//   styleUrl: './services.css'
// })
// export class Services {

// }

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private mockExams = [
    {
      id: '1',
      title: 'Frontend Basics',
      description: 'An exam about HTML, CSS, and JS basics.',
      questions: [
        {
          text: 'What does HTML stand for?',
          options: [
            'Hyper Text Markup Language',
            'High Text Machine Language',
            'Hyperlinks Text Markup',
            'None of these'
          ],
          correctAnswer: 'Hyper Text Markup Language'
        },
        {
          text: 'Which CSS property controls text size?',
          options: [
            'font-weight',
            'font-size',
            'text-align',
            'line-height'
          ],
          correctAnswer: 'font-size'
        }
      ]
    }
  ];

  constructor() {}

  // GET exam by ID
  getExamById(id: string): Observable<any> {
    const exam = this.mockExams.find(e => e.id === id);
    return of(exam);
  }

  // PUT update exam
  updateExam(id: string, updatedExam: any): Observable<any> {
    const index = this.mockExams.findIndex(e => e.id === id);
    if (index !== -1) {
      this.mockExams[index] = {
        ...this.mockExams[index],
        ...updatedExam
      };
    }
    return of(this.mockExams[index]);
  }
}

