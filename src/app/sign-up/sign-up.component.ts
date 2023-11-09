import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Service } from '../service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent{
  formGroup!:FormGroup
  constructor(private _fb:FormBuilder,private _router:Router,private _loginService:Service)
  {
    this.formGroup=this._fb.group({
      userName: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8}$/)])
    })
  }
signUp()
{
 if(this.formGroup.valid)
 {
    this._loginService.postLoginDetails(this.formGroup.value).subscribe({
      next:()=>{
        this._router.navigate(['login'])
      }
    })
 }
}
  
}
