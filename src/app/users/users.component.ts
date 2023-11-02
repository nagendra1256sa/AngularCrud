import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  dataSource!:MatTableDataSource<any>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort
  displayedColumns:string[]=['id','Name','LastName','DOB','PhoneNumber','Actions']
  constructor(private _router:Router,private _service:ServiceService,private _Aroute:ActivatedRoute){}
  ngOnInit(): void {
    this.getUserDetails();
    this._router.events.pipe(filter(event=> event instanceof NavigationEnd)).subscribe(()=>{
      if(this._Aroute.snapshot.routeConfig?.path==='users')
      {
         this.getUserDetails()
      }
    })
  }
   applyFilter(event:any)
   {
      const filterValue= (event.target as HTMLInputElement).value
      this.dataSource.filter= filterValue.trim().toLowerCase()
   }
   openAddEditForm()
   {
     this._router.navigate(['/dashboard/users/add'])
   }
   editFormOpen(id:number)
   {
     this._router.navigate([`/dashboard/users/edit/${id}`])
   }
   getUserDetails()
   {
     this._service.getUserList().subscribe({
       next:(val)=>
       {
         this.dataSource=new MatTableDataSource(val);
         this.dataSource.paginator=this.paginator;
         this.dataSource.sort=this.sort
       }
     })
   }
   deleteUser(id:number)
   {
     this._service.deleteUser(id).subscribe({
      next:()=>
      {
         alert("User successfully deleted")  
         this.getUserDetails();
      }
     })
   }
   details(id:number)
   {
      this._router.navigate([`/dashboard/users/card/${id}`])
   }
}
