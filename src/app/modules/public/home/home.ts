import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Hero } from "./hero/hero";
import { UserTypes } from "./user-types/user-types";
import { Features } from "./features/features";
import { Navbar } from "../../../shared/components/navbar/navbar";
import { CtaSection } from "./cta-section/cta-section";
import { Footer } from "../../../shared/components/footer/footer";

@Component({
  selector: 'app-home',
  imports: [RouterModule,Hero, UserTypes, Features, Navbar, CtaSection, Footer],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,

})
export class Home {

}
