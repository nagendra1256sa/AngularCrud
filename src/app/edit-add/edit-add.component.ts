import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-add',
  templateUrl: './edit-add.component.html',
  styleUrls: ['./edit-add.component.scss']
})
export class EditAddComponent implements OnInit{
  disable:boolean=true
  empForm:FormGroup;
   constructor(private _fb:FormBuilder,
    private _employeSerbice:ServiceService,
    private _dialogRef:MatDialogRef<EditAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any)
   {
       this.empForm=this._fb.group({
          Sku:new FormControl('',[
            Validators.required
          ]),
          Name:new FormControl('',[
            Validators.required
          ]),
          DisplayName:new FormControl('',[
            Validators.required
          ]),
          SellingPrice:new FormControl('',[
            Validators.required
          ]),
          BasePrice:new FormControl('',[
            Validators.required
          ]),
          Description:new FormControl('',[
            Validators.required
          ])
       })
   }
  ngOnInit(): void {
     if(this.data)
     {
      // const myPhoneArray=this.empForm.get('phoneNumbers') as FormArray
       this.empForm.get('Sku')?.setValue(this.data.Sku),
       this.empForm.get('Name')?.setValue(this.data.Name)
       this.empForm.get('DisplayName')?.setValue(this.data.DisplayName)
       this.empForm.get('SellingPrice')?.setValue(this.data.SellingPrice)
       this.empForm.get('BasePrice')?.setValue(this.data.BasePrice)
       this.empForm.get('Description')?.setValue(this.data.Description)

      //  myPhoneArray.clear()

      //  for(const phoneNumber of this.data.phoneNumbers)
      //  {
      //    myPhoneArray.push(new FormControl(phoneNumber, [Validators.required, Validators.max(10)]))
      //  }
     }
  }
   onSubmit()
   {
    if(this.data)
    {
      if(this.empForm.valid)
      {
        this._employeSerbice.UpdateEmployee(this.empForm.value,this.data.id).subscribe({
          next:(val:any)=>
          {
            this._dialogRef.close(true);
          },
          error:(err:any)=>
          {
            console.log(err);
          }
        })
      }
    }
    else{
      if(this.empForm.valid)
      {
        this._employeSerbice.addEmployee(this.empForm.value).subscribe({
          next:(val:any)=>
          {
            alert("data is added")
            this._dialogRef.close(true);
          },
          error:(err:any)=>
          {
            console.log(err);
          }
        })
      }
    }
   }
   addNumber()
   {
     const control=new FormControl('',Validators.required);
    ( this.empForm.get('phoneNumbers') as FormArray).push(control)
   }
   get addPNumber()
   {
     return (this.empForm.get('phoneNumbers') as FormArray).value
   }
   remove(index:number)
   {
     const myArray=this.empForm.get('phoneNumbers') as FormArray;
     if(myArray && myArray.length > index)
     {
        myArray.removeAt(index)
     }
   }
   disableCancel(){
     return this.addPNumber.length===1?true:false;
   }
}
