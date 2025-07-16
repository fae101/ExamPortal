import { RouterModule, Routes } from '@angular/router';
import { CreateExam } from './modules/teacher/pages/create-exam/create-exam';
import { AdminDashboard } from './modules/teacher/pages/admin-dashboard/admin-dashboard';
import { ExamList } from './modules/student/components/exam-list/exam-list';
import { ExamsList } from './modules/teacher/components/exams-list/exams-list';
import { ViewStudents } from './modules/teacher/view-students/view-students';
import { Home } from './modules/public/home/home';
import { Register } from './modules/public/register/register/register';
import { Login } from './modules/public/login/login';
import { Component } from '@angular/core';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'teacher/dashboard', component: AdminDashboard },
  { path:'student/exam-list',component:ExamList},
  { path:'teacher/exam-list',component:ExamList},
  { path: 'teacher/create-exam', component: CreateExam },
  { path: 'teacher/view-students', component: ViewStudents }, // add if exists
  { path: 'register', component: Register },
  { path: 'login', component: Login }
];