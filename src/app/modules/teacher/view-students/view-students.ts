import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

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
  imports: [DatePipe, RouterLink],
  templateUrl: './view-students.html',
  styleUrls: ['./view-students.css']
})
export class ViewStudents implements OnInit {
  students: Student[] = [];
  loading = true;

  constructor() {}

  ngOnInit(): void {
    // Load static data immediately
    this.students = this.getStaticStudents();
    this.loading = false;
    
    // Or if you want to keep the loading simulation:
    // setTimeout(() => {
    //   this.students = this.getStaticStudents();
    //   this.loading = false;
    // }, 1000);
  }

  private getStaticStudents(): Student[] {
    return [
      {
        id: '1',
        fullName: 'John Smith',
        email: 'john.smith@email.com',
        enrolledDate: '2024-01-15T10:30:00Z',
        totalExams: 5,
        averageScore: 87
      },
      {
        id: '2',
        fullName: 'Emma Johnson',
        email: 'emma.johnson@email.com',
        enrolledDate: '2024-01-20T14:45:00Z',
        totalExams: 3,
        averageScore: 92
      },
      {
        id: '3',
        fullName: 'Michael Brown',
        email: 'michael.brown@email.com',
        enrolledDate: '2024-02-01T09:15:00Z',
        totalExams: 7,
        averageScore: 78
      },
      {
        id: '4',
        fullName: 'Sarah Davis',
        email: 'sarah.davis@email.com',
        enrolledDate: '2024-02-10T16:20:00Z',
        totalExams: 4,
        averageScore: 95
      },
      {
        id: '5',
        fullName: 'David Wilson',
        email: 'david.wilson@email.com',
        enrolledDate: '2024-02-15T11:00:00Z',
        totalExams: 6,
        averageScore: 82
      },
      {
        id: '6',
        fullName: 'Lisa Anderson',
        email: 'lisa.anderson@email.com',
        enrolledDate: '2024-03-01T13:30:00Z',
        totalExams: 2,
        averageScore: 89
      },
      {
        id: '7',
        fullName: 'Robert Taylor',
        email: 'robert.taylor@email.com',
        enrolledDate: '2024-03-05T08:45:00Z',
        totalExams: 8,
        averageScore: 76
      },
      {
        id: '8',
        fullName: 'Jennifer Martinez',
        email: 'jennifer.martinez@email.com',
        enrolledDate: '2024-03-12T15:10:00Z',
        totalExams: 3,
        averageScore: 91
      }
    ];
  }
}