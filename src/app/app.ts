
import { UserTypes } from './modules/public/home/user-types/user-types';
import { Component } from '@angular/core';
import { Home } from "./home/home";
import { CreateExam } from './modules/teacher/pages/create-exam/create-exam';

@Component({
  selector: 'app-root',
  imports: [Home,CreateExam],

  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,

})
export class App {
  protected title = 'ExamPortal';
}
