// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute,Router } from '@angular/router';
// import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { ExamService } from '../../../../core/services/services';
// @Component({
//   selector: 'app-edit-exam',
//   imports: [ReactiveFormsModule],
//   templateUrl: './edit-exam.html',
//   styleUrl: './edit-exam.css'
// })
// export class EditExam implements OnInit{
//   // ngOnInit(): void {
//   //   throw new Error('Method not implemented.');
//   // }
// //
// examForm!: FormGroup;
//   examId!: string;



//   constructor(
//     private route: ActivatedRoute,
//     private fb: FormBuilder,
//     private examService: ExamService,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     this.examId = this.route.snapshot.paramMap.get('id') || '';

//     this.examForm = this.fb.group({
//       title: [''],
//       description: [''],
//       questions: this.fb.array([])
//     });
//     const fb =this.fb;

//     this.examService.getExamById(this.examId).subscribe(exam => {
//       this.examForm.patchValue({
//         title: exam.title,
//         description: exam.description
//       });

//       exam.questions.forEach(q => {
//         this.questions.push(
//           this.fb.group({
//             text: [q.text],
//             options: fb.array(q.options.map(opt=>fb.control(opt))),
//             correctAnswer: [q.correctAnswer]
//           })
//         );
//       });
//     });
//   }

//   get questions() {
//     return this.examForm.get('questions') as FormArray;
//   }

//   update() {
//     this.examService.updateExam(this.examId, this.examForm.value).subscribe(() => {
//       this.router.navigate(['/teacher/manage-exams']);
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExamService } from '../../../../core/services/services';

//interfaces
interface Question {
  text: string;
  options: string[];
  correctAnswer: string;
}

interface Exam {
  title: string;
  description: string;
  questions: Question[];
}

@Component({
  selector: 'app-edit-exam',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-exam.html',
  styleUrl: './edit-exam.css'
})
export class EditExam implements OnInit {
  examForm!: FormGroup;
  examId!: string;

  // added
  loading = false;
  saving = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private examService: ExamService,
    private router: Router
  ) {}

  ngOnInit() {
    this.examId = this.route.snapshot.paramMap.get('id') || '';

    this.examForm = this.fb.group({
      title: [''],
      description: [''],
      questions: this.fb.array([])
    });


             // change this
    this.loading = true;
    this.examService.getExamById(this.examId).subscribe((exam: Exam) => {
      this.examForm.patchValue({
        title: exam.title,
        description: exam.description
      });




      //
      exam.questions.forEach((q: Question) => {
        this.questions.push(
          this.fb.group({
            text: [q.text],
            options: this.fb.array(q.options.map((opt: string) => this.fb.control(opt))),
            correctAnswer: [q.correctAnswer]
          })
        );
      });

        this.loading = false; // added
    });
  }

  get questions() {
    return this.examForm.get('questions') as FormArray;
  }

  //chanded
  update() {
   this.saving = true;
    this.examService.updateExam(this.examId, this.examForm.value).subscribe(() => {
       this.saving = false;
      this.router.navigate(['/teacher/manage-exams']);
    });
  }



  //  functions added
  addQuestion() {
    const newQuestion = this.fb.group({
      text: [''],
      options: this.fb.array(['', '', '', ''].map(opt => this.fb.control(opt))),
      correctAnswer: ['']
    });
    this.questions.push(newQuestion);
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }
}











