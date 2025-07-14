import { RouterModule,Routes } from '@angular/router';
import { CreateExam } from './modules/teacher/pages/create-exam/create-exam';

export const routes: Routes = [
{path:'',redirectTo:'teacher/create-exam',pathMatch:'full'},

{path:'teacher/create-exam',component:CreateExam}


];
// @NgModule({
//   imports:[RouterModule.forRoot(routes)],
//   exports:[RouterModule]
// })
// export class AppRoutingModule{}
