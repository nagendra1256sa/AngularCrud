import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
     formGroup!:FormGroup
     constructor(private _fb:FormBuilder,private _router:Router)
     {
       this.formGroup=this._fb.group({
         userName: new FormControl('',[Validators.required]),
         password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8}$/)])
       })
     }
  ngOnInit(): void {
  }
  login()
  {
    if(this.formGroup.valid)
    {
      localStorage.setItem('loginCredintials',JSON.stringify(this.formGroup.value))
      this._router.navigate(['dashboard'])
    }
  }
     
}
