import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
  standalone: true,

})
export  class Footer {
  currentYear: number = new Date().getFullYear();
}
