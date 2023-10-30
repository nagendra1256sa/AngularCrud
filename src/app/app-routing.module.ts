import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAddComponent } from './edit-add/edit-add.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardComponent } from './card/card.component';

const routes: Routes = [
  {
     path:'dashboard',
     component:DashboardComponent,
     children:[
      {
        path:'add',
        component:EditAddComponent
      },
      {
        path:'edit/:id',component:EditAddComponent
      },
      {
        path:'card/:id',component:CardComponent
      }
     ]
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
