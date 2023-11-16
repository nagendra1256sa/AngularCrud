import { Component } from '@angular/core';;
import { MatDialog } from '@angular/material/dialog';
import {  Router } from '@angular/router';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {
  constructor(private _matDialog:MatDialog, private _route:Router)
  { }
  openItems()
  {
    this._route.navigate(['dashboard/items'])
  }  
  openUsers()
  {
    this._route.navigate(['dashboard/users'])
  } 
  logout()
  {
     localStorage.clear();
     this._route.navigate(['login'])
  }
  changePassword()
  {
     this._matDialog.open(ChangePasswordComponent)
  }
}
