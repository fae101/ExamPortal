import { RouterModule,Routes } from '@angular/router';
import { CreateExam } from './modules/teacher/pages/create-exam/create-exam';
import { Home } from './modules/public/home/home';
import { Register } from './modules/public/register/register/register';
import { Login } from './modules/public/login/login';

export const routes: Routes = [
{path:'',redirectTo:'teacher/create-exam',pathMatch:'full'},

{path:'teacher/create-exam',component:CreateExam}
{path:'register', component:Register},
{ path: '', component: Home },
{path:'login',component:Login}

];
