import { Injectable } from "@angular/core";

export class itemModal{
    id?:number;
     Sku?:string;
     Name?:string;
     SellingPrice?:string
}

@Injectable({
    providedIn: 'root'
  })

  export class batchAdapter 
  {
    adapt(data: any): itemModal 
    {
        const batch = new itemModal();
        try{
             batch.Sku=data.Sku;
             batch.Name=data.Name
             batch.SellingPrice=data.SellingPrice
             batch.id=data.id
        }
        catch(e)
        {
          console.log(e);
             
        }
        return batch
    }
  }