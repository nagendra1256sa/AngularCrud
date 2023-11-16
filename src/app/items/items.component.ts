import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Service } from '../service.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

export interface DetailsTypeWithId{
  id:number
  Sku:string;
  Name:string;
  DisplayName:string;
  BasePrice:string;
  SellingPrice:string;
  Description:string
}

// interface TableDataTypeCheck{
//   id:number;
//   Sku:string;
//   Name:string;
//   SellingPrice:string;
// }

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent  implements OnInit{
  public displayedColumns: string[] = ['Sku', 'Name','SellingPrice','action'];
  public dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _matDialog:MatDialog, private _ItemService:Service, private _ItemRouter:Router,private _ItemActivateRouter:ActivatedRoute)
  { }
  ngOnInit(): void {
    this.getItemList();
    this._ItemRouter.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(()=>
    {
      if(this._ItemActivateRouter.snapshot.routeConfig?.path==="items")
      {
         this.getItemList()
      }
    })
  }
  getItemList(): void {
    this._ItemService.getItemList().subscribe({
       next:(res)=>
       {
         this.dataSource=new MatTableDataSource(res.responseData);
         this.dataSource.sort=this.sort;
         this.dataSource.paginator=this.paginator
       }
    })
  }
  deleteItemDetails(id:number)
  {
    this._ItemService.deleteItem(id).subscribe({
      next:(val)=>
      {
         alert("Emp details is deleted");
         this.getItemList();
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
    this._ItemRouter.navigate([`/dashboard/items/edit/${id}`])
  }
  openCardDialog(id:number)
  {
      this._ItemRouter.navigate([`dashboard/items/card/${id}`])
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
    this._ItemRouter.navigate(['dashboard/items/add'])
  }
}
