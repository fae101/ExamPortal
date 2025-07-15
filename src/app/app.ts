import { Component } from '@angular/core';
import { Home } from "../app/modules/public/home/home";
import { CreateExam } from './modules/teacher/pages/create-exam/create-exam';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [Home, CreateExam, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,

})
export class App {
  protected title = 'ExamPortal';
}
