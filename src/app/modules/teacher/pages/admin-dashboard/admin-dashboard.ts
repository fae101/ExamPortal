import { Component } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';
import { ExamList } from '../../../student/components/exam-list/exam-list';
import { ExamsList } from "../../components/exams-list/exams-list";
import { Navbar } from "../../../../shared/components/navbar/navbar";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [Sidebar, ExamList, ExamsList, Navbar],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard {
  constructor() { }
}