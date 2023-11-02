import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EditDetailsType } from './edit-add/edit-add.component';
import { UserEditDetailsType } from './user-form/user-form.component';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private _http:HttpClient) { }
  //Items
  addItem(data:EditDetailsType):Observable<any>
  {
    return this._http.post(" http://localhost:5000/items",data,{
      headers:{
        'contentType':"application/json"
      }
    })
  }
  UpdateItem(data:EditDetailsType,id:number):Observable<any>
  {
    return this._http.put(` http://localhost:5000/items/${id}`,data,{
      headers:{
        'contentType':"application/json"
      }
    })
  }
  getItemList():Observable<any>
  {
    return this._http.get(" http://localhost:5000/items");
  }
  deleteItem(id:number):Observable<any>
  {
    return this._http.delete(` http://localhost:5000/items/${id}`)
  }
  getItemListById(id:number):Observable<any>
  {
    return this._http.get(`http://localhost:5000/items/${id}`);
  }
  //Users
  addUsers(data:UserEditDetailsType):Observable<any>
  {
    return this._http.post(" http://localhost:5000/users",data,{
      headers:{
        'contentType':"application/json"
      }
    })
  }
  UpdateUser(data:UserEditDetailsType,id:number):Observable<any>
  {
    return this._http.put(` http://localhost:5000/Users/${id}`,data,{
      headers:{
        'contentType':"application/json"
      }
    })
  }
  getUserList():Observable<any>
  {
    return this._http.get(" http://localhost:5000/Users");
  }
  deleteUser(id:number):Observable<any>
  {
    return this._http.delete(` http://localhost:5000/Users/${id}`)
  }
  getUserListById(id:number):Observable<any>
  {
    return this._http.get(`http://localhost:5000/Users/${id}`);
  }
}
