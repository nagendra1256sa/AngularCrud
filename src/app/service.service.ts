import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private _http:HttpClient) { }
  addEmployee(data:any):Observable<any>
  {
    return this._http.post(" http://localhost:5000/items",data,{
      headers:{
        'contentType':"application/json"
      }
    })
  }
  UpdateEmployee(data:any,id:number):Observable<any>
  {
    return this._http.put(` http://localhost:5000/items/${id}`,data,{
      headers:{
        'contentType':"application/json"
      }
    })
  }
  getEmployyeList():Observable<any>
  {
    return this._http.get(" http://localhost:5000/items");
  }
  deleteEmployee(id:number):Observable<any>
  {
    return this._http.delete(` http://localhost:5000/items/${id}`)
  }
}
