import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component imports
import { ExamList } from '../student/components/exam-list/exam-list';
import { ExamDetails } from '../student/components/exam-details/exam-details';
import { SubmissionHistory } from '../student/components/submission-history/submission-history';
import { ExamResults } from '../student/components/exam-results/exam-results';

const routes: Routes = [
  { path: 'exams', component: ExamList },
  { path: 'exams/:id', component: ExamDetails },
  { path: 'submissions', component: SubmissionHistory },
  { path: 'results/:id', component: ExamResults }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}
