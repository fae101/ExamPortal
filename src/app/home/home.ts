import { Component } from '@angular/core';
import { Hero } from "./hero/hero";
import { UserTypes } from "./user-types/user-types";
import { Features } from "./features/features";
import { Navbar } from "../shared/navbar/navbar";
import { CtaSection } from "./cta-section/cta-section";
import { Footer } from "../shared/footer/footer";

@Component({
  selector: 'app-home',
  imports: [Hero, UserTypes, Features, Navbar, CtaSection, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
