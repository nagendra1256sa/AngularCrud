import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { EditAddComponent } from './edit-add/edit-add.component'
import {MatDialogModule} from '@angular/material/dialog'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardComponent } from './card/card.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ItemsComponent } from './items/items.component';
import { UsersComponent } from './users/users.component';
import { UserAddEditComponent } from './user-form/user-form.component';
import {MatMenuModule} from '@angular/material/menu';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import { UserCardComponent } from './user-card/user-card.component';
import {MatListModule} from '@angular/material/list';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
@NgModule({
  declarations: [
    AppComponent,
    EditAddComponent,
    DashboardComponent,
    CardComponent,
    ItemsComponent,
    UsersComponent,
    UserAddEditComponent,
    LoginComponent,
    UserCardComponent,
    SignUpComponent,
    ChangePasswordComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
   MatNativeDateModule,
   MatRadioModule,
   MatSelectModule,
   ReactiveFormsModule,
   HttpClientModule,
   MatTableModule,
   MatPaginatorModule,
   MatSortModule,
   MatSidenavModule,
   MatMenuModule,
   MatCardModule,
   MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
