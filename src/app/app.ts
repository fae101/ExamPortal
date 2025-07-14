import { Component } from '@angular/core';
import { Home } from "./home/home";
import { CreateExam } from './modules/teacher/pages/create-exam/create-exam';

@Component({
  selector: 'app-root',
  imports: [Home,CreateExam],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'ExamPortal';
}
