import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../service.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent  implements OnInit{
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
      if(this._router.snapshot.routeConfig?.path==="items")
      {
         this.getEmployeeList()
      }
    })
  }
  getEmployeeList(): void {
    this._empService.getItemList().subscribe({
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
    this._empService.deleteItem(id).subscribe({
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
    this._route.navigate([`/dashboard/items/edit/${id}`])
  }
  openDialog(id:number)
  {
      this._route.navigate([`dashboard/items/card/${id}`])
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter= filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
    this._route.navigate(['dashboard/items/add'])
  }
}
