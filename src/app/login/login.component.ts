import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Service} from '../service.service';

interface LoginTypeCheck{
   userName:string;
   password:string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  LoginData:any
  loginCheck:boolean=false;
     loginFormGroup!:FormGroup
     constructor(private _fb:FormBuilder,private _router:Router,private _loginService:Service)
     {
       this.loginFormGroup=this._fb.group({
         userName: new FormControl('',[Validators.required]),
         password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/)])
       })
     }
  ngOnInit(): void {
       this.getLogindetails();
  }
  getLogindetails()
  {
     this._loginService.getLoginDetails().subscribe({
       next:(val)=>
       {
         this.LoginData=val
       }
     })
  }
  passwordChecking():boolean
  {
     const username=this.loginFormGroup.value.userName;
     const password=this.loginFormGroup.value.password;
     return this.LoginData?.some((user:any)=>
     {
        return user.user_name===username && user.password===password
     })
  }
  login()
  {
    if(this.loginFormGroup.valid)
    {
      // if(this.passwordChecking())
      // {
      //       localStorage.setItem('loginCredintials',JSON.stringify(this.loginFormGroup.value))
      //       this._router.navigate(['dashboard'])
      //       this.loginCheck=false;
      // }
      // else{
      //      this.loginCheck=true
      // }
      this._loginService.getLoginDetailsByName(this.loginFormGroup.value).subscribe({
        next:(res)=>
        {
          localStorage.setItem('loginCredintials',JSON.stringify(this.loginFormGroup.value))
           this._router.navigate(['/dashboard'])
        },
        error:(err)=>
        {
          console.log(err.error);
          
           this.loginCheck=true
        }
      })
    }
  }
     
}
