import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar{
  constructor(private router: Router) {}

  navigateToCreateExam() {
    this.router.navigate(['/teacher/create-exam']);
  }

  navigateToViewStudents() {
    this.router.navigate(['/teacher/view-students']);
  }
}