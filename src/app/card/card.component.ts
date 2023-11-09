import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../service.service';

interface DetailsType{
  Sku:string;
  Name:string;
  DisplayName:string;
  BasePrice:string;
  SellingPrice:string;
  Description:string
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{
  data:DetailsType|undefined
  routeSubscription: any;
    constructor(private _Activated:ActivatedRoute,private getDataById:Service,private _router:Router){}
  ngOnInit(): void {
    // this.routeSubscription = this._Activated.paramMap.subscribe(params => {
    //   const id = params.get('id');
    //   console.log('Route Parameter ID:', id);
    // });
     const ItemId=this._Activated.snapshot.paramMap.get('id');
     const id=ItemId? parseInt(ItemId):NaN;
     this.getDataById.getItemListById(id).subscribe({
      next:(val)=>
      {
        this.data=val
      },error:()=>
      {
        alert('Not Found')
        this._router.navigate(['dashboard/items'])
      }
     })
  }

}
