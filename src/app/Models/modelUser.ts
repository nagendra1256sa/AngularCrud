import { Injectable } from "@angular/core";

export class userModal{
   id?:number;
   Name?:string;
   LastName?:string;
   DOB?:string;
   PhoneNumber?:string[];
}

export class addUsers
{
    Name?:string;
    LastName?:string;
    Email?:String;
    DOB?:string;
    Gender?:string;
    Education?:string;
    Company?:string;
    PhoneNumber?:string[];
}

export class AddLogin{
    userName!:string;
    password!:string;
}

@Injectable({
    providedIn:'root'
})

export class userAdapters
{

    adapt(data:any):userModal
   {
      const batch=new userModal();
      try{
         batch.id=data.id;
         batch.Name=data.Name;
         batch.LastName=data.LastName;
         batch.DOB=data.DOB;
         batch.PhoneNumber=data.PhoneNumber
      }
      catch(e)
      {
         console.log(e);
         
      }
      return batch;
   }
}