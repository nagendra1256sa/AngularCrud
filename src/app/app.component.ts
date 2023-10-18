import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditAddComponent } from './edit-add/edit-add.component';
import { ServiceService } from './service.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
   
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','dob','gender','education','company','experience','package','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _matDialog:MatDialog, private _empService:ServiceService)
  { }
  ngOnInit(): void {
    this.getEmployeeList();
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
    const dialogRef=this._matDialog.open(EditAddComponent)
    dialogRef.afterClosed().subscribe({
      next:(val)=>
      {
        if(val)
        {
          this.getEmployeeList();
        }
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter= filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openEditForm(data:any)
  {
    const dialogRef=this._matDialog.open(EditAddComponent,{
      data,
    })
    dialogRef.afterClosed().subscribe({
      next:(val)=>
      {
        if(val)
        {
          this.getEmployeeList();
        }
      }
    })
  }
  

}
