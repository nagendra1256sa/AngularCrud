import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ServiceService } from '../service.service';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

export interface EditDetailsType{
  id:number
  Sku:string;
  Name:string;
  DisplayName:string;
  BasePrice:string;
  SellingPrice:string;
  Description:string
}

@Component({
  selector: 'app-edit-add',
  templateUrl: './edit-add.component.html',
  styleUrls: ['./edit-add.component.scss'],
})
export class EditAddComponent implements OnInit {
  data: EditDetailsType|undefined;
  empForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _employeSerbice: ServiceService,
    private _ActiveRoute: ActivatedRoute , private _Router:Router ) // private _dialogRef:MatDialogRef<EditAddComponent>,
  // @Inject(MAT_DIALOG_DATA) public data:any
  {
    this.empForm = this._fb.group({
      Sku: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z1-9][a-zA-Z0-9\s!@#$%^&*()-_+=\[\]{};:'",.<>\/?]*$/)]),
      Name: new FormControl('', [Validators.required]),
      DisplayName: new FormControl('', [Validators.required,]),
      SellingPrice: new FormControl('', [Validators.required,Validators.pattern(/^[1-9][0-9]*$/)]),
      BasePrice: new FormControl('', [Validators.required,Validators.pattern(/^[1-9][0-9]*$/)]),
      Description: new FormControl('', []),
    });
  }
  ngOnInit(): void {
    const ItemId = this._ActiveRoute.snapshot.paramMap.get('id');
    const id = ItemId ? parseInt(ItemId) : NaN;
    if (id) {
      this._employeSerbice.getItemListById(id).subscribe({
        next: (res) => {
          this.data=res;
          if (this.data) {
            this.empForm.get('Sku')?.setValue(this.data.Sku),
            this.empForm.get('Name')?.setValue(this.data.Name);
            this.empForm.get('DisplayName')?.setValue(this.data.DisplayName);
            this.empForm.get('SellingPrice')?.setValue(this.data.SellingPrice);
            this.empForm.get('BasePrice')?.setValue(this.data.BasePrice);
            this.empForm.get('Description')?.setValue(this.data.Description);
          }
        },error:()=>
        {
          alert("Not Found")
          this._Router.navigate(['dashboard/items'])
        }
      });
    }
  }
  onSubmit() {
    if (this.data) {
      if (this.empForm.valid) {
        this._employeSerbice
          .UpdateItem(this.empForm.value, this.data.id)
          .subscribe({
            next: (val: any) => {
              // this._dialogRef.close(true);
              this._Router.navigate(['/dashboard/items'])
            },
            error: (err: any) => {
              console.log(err);
            },
          });
      }
    } else {
      if (this.empForm.valid) {
        this._employeSerbice.addItem(this.empForm.value).subscribe({
          next: (val: any) => {
            alert('data is added');
            // this._dialogRef.close(true);
            this._Router.navigate(['/dashboard/items'])
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      }
    }
  }
  addNumber() {
    const control = new FormControl('', Validators.required);
    (this.empForm.get('phoneNumbers') as FormArray).push(control);
  }
  get addPNumber() {
    return (this.empForm.get('phoneNumbers') as FormArray).value;
  }
  remove(index: number) {
    const myArray = this.empForm.get('phoneNumbers') as FormArray;
    if (myArray && myArray.length > index) {
      myArray.removeAt(index);
    }
  }
  disableCancel() {
    return this.addPNumber.length === 1 ? true : false;
  }
  checkDirty()
  {
     return this.data&&this.empForm.dirty
  }
}
