import { Component } from '@angular/core';;
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from '../service.service';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {
  constructor(private _matDialog:MatDialog, private _empService:ServiceService, private _route:Router,private _router:ActivatedRoute)
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
}
