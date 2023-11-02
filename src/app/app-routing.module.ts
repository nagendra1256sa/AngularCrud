import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAddComponent } from './edit-add/edit-add.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardComponent } from './card/card.component';
import { ItemsComponent } from './items/items.component';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './user-form/user-form.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './gaurd/auth.guard';
import { UserCardComponent } from './user-card/user-card.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
       path: 'login',component:LoginComponent
  },
  {
     path:'dashboard',
     component:DashboardComponent,canActivate:[authGuard],
     children:[
      {
         path:'items',component:ItemsComponent,
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
        path:'users',
        component:UsersComponent,
        children:[
          {
            path:'add',
            component:UserFormComponent
          },
          {
            path:'edit/:id',component:UserFormComponent
          },{
            path:'card/:id',component:UserCardComponent
          }
        ]
      }
     ]
  },
  {
    path:'',redirectTo:'login',pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
