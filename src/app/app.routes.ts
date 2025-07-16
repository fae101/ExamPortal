import { Component } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CreateExam } from './modules/teacher/pages/create-exam/create-exam';
import { Home } from './modules/public/home/home';
import { Register } from './modules/public/register/register/register';
import { Login } from './modules/public/login/login';
import { Student } from './modules/student/student';
import { ExamList } from './modules/student/components/exam-list/exam-list';
import { ExamDetails } from './modules/student/components/exam-details/exam-details';
import { SubmissionHistory } from './modules/student/components/submission-history/submission-history';
import { ExamResults } from './modules/student/components/exam-results/exam-results';
import { StudentDashboard } from './modules/student/student-dashboard/student-dashboard';

export const routes: Routes = [

{path: '', component: Home },
{path:'teacher/create-exam',component:CreateExam},
{path:'register', component:Register},
{path:'login',component:Login},
{
  path: 'student',
  component: Student, //  this has router-outlet only
  children: [
    { path: '', component: StudentDashboard }, //  homepage with stats and nav cards
    { path: 'exams', component: ExamList },
    { path: 'exam/:id', component: ExamDetails },
    { path: 'submissions', component: SubmissionHistory },
    { path: 'results', component: ExamResults }
  ]
  },


];
