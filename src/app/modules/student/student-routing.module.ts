import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component imports
import { ExamResults } from '../student/components/exam-results/exam-results';
import { Route } from '@angular/router';
import { StudentDashboard } from './student-dashboard/student-dashboard';
import { ExamList } from './components/exam-list/exam-list';
import { ExamDetails } from './components/exam-details/exam-details';
import { SubmissionHistory } from './components/submission-history/submission-history';
import { Student } from './student';

export const studentRoutes: Route[] = [
  {
    path: '',
    component: Student,
    children: [
      { path: '', component: StudentDashboard }, // homepage with cards
      { path: 'exams', component: ExamList },
      { path: 'results', component: ExamResults },
      { path: 'submissions', component: SubmissionHistory }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(studentRoutes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}
