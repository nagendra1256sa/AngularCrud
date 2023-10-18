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
   education:string[]=[
     "Intermidate",
     "Diploma",
     "Post Graduate",
     "Under Graduate"
   ]
   constructor(private _fb:FormBuilder,
    private _employeSerbice:ServiceService,
    private _dialogRef:MatDialogRef<EditAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any)
   {
       this.empForm=this._fb.group({
          firstName:new FormControl('',[
            Validators.required
          ]),
          lastName:new FormControl('',[
            Validators.required
          ]),
          email:new FormControl('',[
            Validators.required
          ]),
          dob:new FormControl('',[
            Validators.required
          ]),
          gender:new FormControl('',[
            Validators.required
          ]),
          education:new FormControl('',[
            Validators.required
          ]),
          company:new FormControl('',[
            Validators.required
          ]),
          experience:new FormControl('',[
            Validators.required
          ]),
          package:new FormControl('',[
            Validators.required
          ]),
          phoneNumbers:new FormArray([new FormControl('',Validators.required)])
       })
   }
  ngOnInit(): void {
     if(this.data)
     {
      const myPhoneArray=this.empForm.get('phoneNumbers') as FormArray
       this.empForm.get('firstName')?.setValue(this.data.firstName),
       this.empForm.get('lastName')?.setValue(this.data.lastName)
       this.empForm.get('email')?.setValue(this.data.email)
       this.empForm.get('dob')?.setValue(this.data.dob)
       this.empForm.get('gender')?.setValue(this.data.gender)
       this.empForm.get('education')?.setValue(this.data.education)
       this.empForm.get('company')?.setValue(this.data.company)
       this.empForm.get('experience')?.setValue(this.data.experience)
       this.empForm.get('package')?.setValue(this.data.package)

       myPhoneArray.clear()

       for(const phoneNumber of this.data.phoneNumbers)
       {
         myPhoneArray.push(new FormControl(phoneNumber, [Validators.required, Validators.max(10)]))
       }
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
