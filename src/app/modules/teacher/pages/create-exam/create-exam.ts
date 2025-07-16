import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExamService } from '../../exam.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-exam',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-exam.html',
  styleUrl: './create-exam.css'
})
export class CreateExam {
  examForm: FormGroup;
  private examService = inject(ExamService);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.examForm = this.fb.group({
      examName: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      duration: ['', [Validators.required, Validators.min(1)]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      questions: this.fb.array([])
    });
  }

  get questions() {
    return this.examForm.get('questions') as FormArray;
  }

  getQuestionOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('options') as FormArray;
  }

  addQuestion() {
    const questionGroup = this.fb.group({
      text: ['', [Validators.required]],
      options: this.fb.array([
        this.fb.control('', [Validators.required]),
        this.fb.control('', [Validators.required]),
        this.fb.control('', [Validators.required]),
        this.fb.control('', [Validators.required])
      ]),
      correctAnswer: ['', [Validators.required]]
    });
    
    this.questions.push(questionGroup);
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  submit() {
    if (this.examForm.valid) {
      const formValue = this.examForm.value;
      
      // Combine date and time
      const examDateTime = new Date(`${formValue.date}T${formValue.time}`);
      
      const newExam = {
        id: this.generateId(),
        examName: formValue.examName,
        subject: formValue.subject,
        date: examDateTime,
        duration: parseInt(formValue.duration),
        status: "Active" as "Active",
        questions: formValue.questions
      };

      this.examService.addExam(newExam);
      alert('Exam created successfully!');
      this.router.navigate(['/exam-list']);
    } else {
      alert('Please fill all required fields correctly.');
    }
  }

  private generateId(): string {
    return String(this.examService.getExams().length + 1).padStart(3, '0');
  }

  // Helper method for template to convert index to letter
  getOptionLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }
}