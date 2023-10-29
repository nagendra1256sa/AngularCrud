import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAddComponent } from './edit-add/edit-add.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path:'add',
    component:EditAddComponent
  },
  {
     path:'dashboard',
     component:DashboardComponent
  },
  {
    path:'',redirectTo:'dashboard',pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
