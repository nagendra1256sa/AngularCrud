import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ServiceService } from '../service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-add',
  templateUrl: './edit-add.component.html',
  styleUrls: ['./edit-add.component.scss'],
})
export class EditAddComponent implements OnInit {
  data: any;
  empForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _employeSerbice: ServiceService,
    private _ActiveRoute: ActivatedRoute , private _Router:Router ) // private _dialogRef:MatDialogRef<EditAddComponent>,
  // @Inject(MAT_DIALOG_DATA) public data:any
  {
    this.empForm = this._fb.group({
      Sku: new FormControl('', [Validators.required]),
      Name: new FormControl('', [Validators.required]),
      DisplayName: new FormControl('', [Validators.required]),
      SellingPrice: new FormControl('', [Validators.required]),
      BasePrice: new FormControl('', [Validators.required]),
      Description: new FormControl('', []),
    });
  }
  ngOnInit(): void {
    const ItemId = this._ActiveRoute.snapshot.paramMap.get('id');
    const id = ItemId ? parseInt(ItemId) : NaN;

    if (id) {
      this._employeSerbice.getEmployyeListById(id).subscribe({
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
        },
      });
    }
  }
  onSubmit() {
    if (this.data) {
      if (this.empForm.valid) {
        this._employeSerbice
          .UpdateEmployee(this.empForm.value, this.data.id)
          .subscribe({
            next: (val: any) => {
              // this._dialogRef.close(true);
              this._Router.navigate(['/dashboard'])
            },
            error: (err: any) => {
              console.log(err);
            },
          });
      }
    } else {
      if (this.empForm.valid) {
        this._employeSerbice.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            alert('data is added');
            // this._dialogRef.close(true);
            this._Router.navigate(['/dashboard'])
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
}
