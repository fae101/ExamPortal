import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FormBuilder,FormGroup,FormArray,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-exam',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './create-exam.html',
  styleUrl: './create-exam.css'
})
export class CreateExam {


examForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.examForm = this.fb.group({
      title: [''],
      description: [''],
      questions: this.fb.array([])
    });
  }

   //  create-exam
getQuestionOptions(questionIndex: number): FormArray {
  return this.questions.at(questionIndex).get('options') as FormArray;
}


  get questions() {
    return this.examForm.get('questions') as FormArray;
  }

  addQuestion() {
    this.questions.push(
      this.fb.group({
        text: [''],
        options: this.fb.array(['', '', '', '']),
        correctAnswer: ['']
      })
    );
  }

  submit() {
     alert('quetion is created!');
    console.log(this.examForm.value);
  }





}
