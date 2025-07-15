import { Routes } from '@angular/router';
import { Home } from './modules/public/home/home';
import { Register } from './modules/public/register/register/register';
import { Login } from './modules/public/login/login';

export const routes: Routes = [
    {path:'register', component:Register},
    { path: '', component: Home },
    {path:'login',component:Login}
];
