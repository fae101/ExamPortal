import { RouterModule,Routes } from '@angular/router';
import { CreateExam } from './modules/teacher/pages/create-exam/create-exam';
import { Home } from './modules/public/home/home';
import { Register } from './modules/public/register/register/register';
import { Login } from './modules/public/login/login';
import { Student } from './modules/student/student';

export const routes: Routes = [

{path: '', component: Home },
{path:'teacher/create-exam',component:CreateExam},
{path:'register', component:Register},
{path:'login',component:Login},
{path:'student',component:Student}

];
