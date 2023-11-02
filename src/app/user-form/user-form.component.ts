import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';

interface EducationType {
  value: string;
  viewValue: string;
}
export interface UserEditDetailsType{
   id:number;
   Name:string;
   LastName:string;
   Email:String;
   DOB:string;
   Gender:string;
   Education:string;
   Company:string;
   PhoneNumber:string[];
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm!:FormGroup
  data:UserEditDetailsType|undefined
  Education : EducationType[]=[
    {value:'Diploma', viewValue:'Diploma'},
    {value:'Intermidate', viewValue:'Intermidate'},
    {value:'PG', viewValue:'PG'},
    {value:'UG', viewValue:'UG'},

  ]
  constructor(private _fb:FormBuilder,private _router:Router,private _service:ServiceService,private ActiveRoute:ActivatedRoute)
  {
       this.userForm=this._fb.group({
         Name: new FormControl('',[Validators.required]),
         LastName: new FormControl('',[Validators.required]),
         Email: new FormControl('',[Validators.required]),
         DOB: new FormControl('',[Validators.required]),
         Gender: new FormControl('',[Validators.required]),
         Education: new FormControl('',[Validators.required]),
         Company:new FormControl('',[Validators.required]),
         PhoneNumber: new FormArray([new FormControl('',[Validators.required,Validators.pattern(/^[1-9]\d{9}$/)])]),
       })
  }
  ngOnInit(): void {
    const UId=this.ActiveRoute.snapshot.paramMap.get('id');
    const id= UId ? parseInt(UId):NaN;
    if(id)
    {
       this._service.getUserListById(id).subscribe({
         next:(val)=>
         {
           this.data=val;
           if(this.data)
           {
            const myArray=this.userForm.get('PhoneNumber') as FormArray;
             this.userForm.get('Name')?.setValue(this.data.Name)
             this.userForm.get('LastName')?.setValue(this.data.LastName)
             this.userForm.get('Email')?.setValue(this.data.Email)
             this.userForm.get('DOB')?.setValue(this.data.DOB)
             this.userForm.get('Gender')?.setValue(this.data.Gender)
             this.userForm.get('Company')?.setValue(this.data.Company)
             this.userForm.get('Education')?.setValue(this.data.Education)
             myArray.clear();
             for(const Number of this.data.PhoneNumber)
             {
               myArray.push(new FormControl(Number,[Validators.required,Validators.pattern(/^[1-9]\d{9}$/)]))
             }
           }
         },error:(err)=>
         {
           alert('Not Found')
           this._router.navigate(['dashboard/users'])
         }
       })
    }
  }
  onSubmit()
  {
      if(this.data)
      {
         if(this.userForm.valid)
         {
           this._service.UpdateUser(this.userForm.value,this.data.id).subscribe({
             next:(val)=>
             {
               this._router.navigate(['/dashboard/users'])
             },
             error:(err)=>
             {
               alert("Not Found")
             }
           })
         }
      }
      else{
         if(this.userForm.valid)
         {
           this._service.addUsers(this.userForm.value).subscribe({
            next:(val)=>{
              alert('data added successfully' )
              this._router.navigate(['dashboard/users'])
            }
           })
         }
      }
  }
  addNumber()
  {
     const control=new FormControl('',[Validators.required]);
     (this.userForm.get('PhoneNumber')as FormArray).push(control)
  }
  get PhoneControls()
  {
     return this.userForm.get('PhoneNumber') as FormArray
  }
  deleteField(index:number)
  {
     const myArray=this.userForm.get('PhoneNumber') as FormArray;
     if(myArray && myArray.length>index)
     {
       myArray.removeAt(index)
     }
  }
  disableButton():boolean
  {
     return this.PhoneControls.length ===1;
  }
  checkDirty()
  {
     return this.data && this.userForm.dirty
  }

}
