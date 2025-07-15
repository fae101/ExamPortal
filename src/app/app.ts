
import { UserTypes } from './modules/public/home/user-types/user-types';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Home } from "./modules/public/home/home";
import { Register } from './modules/public/register/register/register';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,

})
export class App {
  protected title = 'ExamPortal';
}
