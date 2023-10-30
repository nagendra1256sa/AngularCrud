import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{
  data:any
    constructor(private _Activated:ActivatedRoute,private getDataById:ServiceService){}
  ngOnInit(): void {
     const ItemId=this._Activated.snapshot.paramMap.get('id');
     const id=ItemId? parseInt(ItemId):NaN;
     this.getDataById.getEmployyeListById(id).subscribe({
      next:(val)=>
      {
        this.data=val
      }
     })
  }

}
