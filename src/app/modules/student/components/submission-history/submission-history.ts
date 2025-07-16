import { Component, OnInit } from '@angular/core';
import { RouterLink,RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-submission-history',
  standalone: true,
  templateUrl: './submission-history.html',
  styleUrls: ['./submission-history.css'],
    imports: [RouterLink, RouterOutlet ]
})
export class SubmissionHistory implements OnInit {
  submissions = [
    {
      examTitle: 'Angular Basics',
      score: 88,
      submittedAt: '2025-07-13 14:40'
    },
    {
      examTitle: 'RxJS Challenge',
      score: 94,
      submittedAt: '2025-07-14 11:22'
    }
  ];

  ngOnInit(): void {}
}
