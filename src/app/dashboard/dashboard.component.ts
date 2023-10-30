import { Component, OnInit, ViewChild } from '@angular/core';
import { EditAddComponent } from '../edit-add/edit-add.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from '../service.service';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  implements OnInit{
   
  displayedColumns: string[] = ['Sku', 'Name','SellingPrice','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _matDialog:MatDialog, private _empService:ServiceService, private _route:Router,private _router:ActivatedRoute)
  { }
  ngOnInit(): void {
    this.getEmployeeList();
    this._route.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(()=>
    {
      if(this._router.snapshot.routeConfig?.path==="dashboard")
      {
         this.getEmployeeList()
      }
    })
  }
  getEmployeeList(): void {
    this._empService.getEmployyeList().subscribe({
       next:(res)=>
       {
         this.dataSource=new MatTableDataSource(res);
         this.dataSource.sort=this.sort;
         this.dataSource.paginator=this.paginator
       }
    })
  }
  deleteEmployeDetails(id:number)
  {
    this._empService.deleteEmployee(id).subscribe({
      next:(val)=>
      {
         alert("Emp details is deleted");
         this.getEmployeeList();
      },
      error:(err)=>{
        console.log(err);  
      }
      
    })
  }
  openAddEditForm()
  {
   
    // const dialogRef=this._matDialog.open(EditAddComponent)
    // dialogRef.afterClosed().subscribe({
    //   next:(val)=>
    //   {
    //     if(val)
    //     {
    //       this.getEmployeeList();
    //     }
    //   }
    // })
    this._route.navigate(['dashboard/add'])
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter= filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openEditForm(id:number)
  {
    
    // const dialogRef=this._matDialog.open(EditAddComponent,{
    //   data,
    // })
    // dialogRef.afterClosed().subscribe({
    //   next:(val)=>
    //   {
    //     if(val)
    //     {
    //       this.getEmployeeList();
    //     }
    //   }
    // })
    this._route.navigate([`/dashboard/edit/${id}`])
  }
  openDialog(id:number)
  {
      this._route.navigate([`dashboard/card/${id}`])
  }

}
