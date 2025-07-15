import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TeacherService } from '../teacher.service';

interface Student {
  id: string;
  fullName: string;
  email: string;
  enrolledDate: string; // ISO
  totalExams: number;
  averageScore: number;
}

@Component({
  selector: 'app-view-students',
  standalone: true,
  imports:  [DatePipe, RouterLink],
  templateUrl: './view-students.html',
  styleUrls: ['./view-students.css']
})
export class ViewStudents implements OnInit {
  students: Student[] = [];
  loading = true;

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.teacherService.getStudents().subscribe({
      next: (data: any) => {
        this.students = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Failed to load students:', err);
        this.loading = false;
      }
    });
  }
}
