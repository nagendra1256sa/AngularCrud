import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Service } from '../service.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit{
     public loginData:any;
     public error!:boolean;
    public message:any = true;
     public changePasswordForm!:FormGroup
     constructor(private _userService:Service,private _matDialog: MatDialog,private _matDialogRef:MatDialogRef<ChangePasswordComponent>)
     {}

     ngOnInit(): void {
        this.changePasswordForm=new FormGroup({
          currentPassword:new FormControl('',[Validators.required ,this.getCurrentPasswordValidators.bind(this)]),
          newPassword:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/)]),
          confirmPassword:new FormControl('',[Validators.required,this.confirmPasswordValidator.bind(this)])
        })
     }
      getCurrentPasswordValidators(control : AbstractControl): ValidationErrors | null
       {
         const Currentpassword=control.value
         const oldPassword= localStorage.getItem('loginCredintials')
         if(oldPassword !== null)
         {
            this.loginData=JSON.parse(oldPassword)
         }
         if(Currentpassword !== this.loginData.password )  
         {
          if(Currentpassword !== "")
           return {"passwordMatch": true}
         }
         return null;
       }
       confirmPasswordValidator(control : AbstractControl): ValidationErrors | null
       {
         const confirmPassword=control.value
         const newPassword=control.parent?.get('newPassword')?.value
        //  const password=newPassword? newPassword.value:null;
         if(confirmPassword !== newPassword)
         {
          if(confirmPassword !== "")
           return {'confirmPassMatch':true}
         }
         return null;
       }
     onSubmit()
     {
        const userDetails=localStorage.getItem('loginCredintials')
        if(userDetails !== null)
        {
          this.loginData=JSON.parse(userDetails)
        }
        console.log(this.loginData.userName);
        
        if(this.changePasswordForm.valid)
        {
           
            this._userService.putLoginDeatils(this.loginData.userName,this.changePasswordForm.value).subscribe({
             next:(val)=>
             {
                
                localStorage.clear();
                localStorage.setItem('loginCredintials',JSON.stringify(val))
          
               this._matDialogRef.close()
             },
             error:(err:any)=>
             {
                console.log(err); 
             }
            })
        }
     }
    
}
