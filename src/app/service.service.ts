import { HttpClient, HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { EditDetailsType } from './edit-add/edit-add.component';
import { UserEditDetailsType } from './user-form/user-form.component';
import { batchAdapter, itemModal } from './Models/modelItems';
import { AddLogin, userAdapters, userModal } from './Models/modelUser';

interface DetailsType{
  Sku:string;
  Name:string;
  DisplayName:string;
  BasePrice:string;
  SellingPrice:string;
  Description:string
}

class getUserDataTypeCheck{
  responseData?:userModal[];
  success?:boolean
}

export class typeChek {
  responseData?:itemModal[];
  success?:boolean;
}

class LoginTypeCheck{
  id!:number;
   userName!:string;
   password!:string
}

@Injectable({
  providedIn: 'root'
})
export class Service {

  constructor(private _http:HttpClient,private _batch:batchAdapter,private _userAdapter:userAdapters) { }
  //Items
  addItem(data:EditDetailsType):Observable<DetailsType>
  {
    return this._http.post<EditDetailsType>(" http://localhost:5000/items",data,{
      headers:{
        'contentType':"application/json"
      }
    })
  }
  UpdateItem(data:EditDetailsType,id:number):Observable<EditDetailsType>
  {
    return this._http.put<EditDetailsType>(` http://localhost:5000/items/${id}`,data,{
      headers:{
        'contentType':"application/json"
      }
    })
  }
  // getItemList():Observable<any>
  // {
  //   const api="http://localhost:5000/items"
  //   return this._http.get(api).pipe(
  //     map(())
  //   )
  // }

  getItemList():Observable<typeChek>{
    const api="http://localhost:5000/items"
    return this._http
    .get(api, { observe: 'response' })
    .pipe(
      map((response: HttpResponse<any>) => {
        const status = response?.status;
        if (status === HttpStatusCode?.Ok) {
          const data = response?.body;
          return {
            responseData: data.map((items: any) =>
              
               this._batch.adapt(items)
            ),
          };
        } else {
          return { responseData: [] };
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return of({ success: false });
      })
    );

  }
  deleteItem(id:number):Observable<EditDetailsType>
  {
    return this._http.delete<EditDetailsType>(` http://localhost:5000/items/${id}`)
  }
  getItemListById(id:number):Observable<EditDetailsType>
  {
    return this._http.get<EditDetailsType>(`http://localhost:5000/items/${id}`);
  }
  //Users
  addUsers(data:UserEditDetailsType):Observable<UserEditDetailsType>
  {
    return this._http.post<UserEditDetailsType>(" http://localhost:5000/users",data,{
      headers:{
        'contentType':"application/json"
      }
    })
  }
  UpdateUser(data:UserEditDetailsType,id:number):Observable<UserEditDetailsType>
  {
    return this._http.put<UserEditDetailsType>(` http://localhost:5000/Users/${id}`,data,{
      headers:{
        'contentType':"application/json"
      }
    })
  }
  // getUserList():Observable<any>
  // {
  //   return this._http.get(" http://localhost:5000/Users");
  // }
  getUserList():Observable<getUserDataTypeCheck>
  {
    const api=" http://localhost:5000/Users"
    return this._http.get(api,{observe:'response'}).pipe(map((responce:HttpResponse<any>)=>{
           const status=responce?.status;
           if(status ===HttpStatusCode?.Ok)
           {
             const data=responce.body;
             return {
              responseData: data.map((users: any) =>
                
                 this._userAdapter.adapt(users)
              ),
            };
           }
           else{
             return {responseData:[]}
           }
    }),
    catchError((error:HttpErrorResponse)=>{
       return of({success: true})
    }));
  }
  deleteUser(id:number):Observable<any>
  {
    return this._http.delete(` http://localhost:5000/Users/${id}`)
  }
  getUserListById(id:number):Observable<UserEditDetailsType>
  {
    return this._http.get<UserEditDetailsType>(`http://localhost:5000/Users/${id}`);
  }
  //login
  getLoginDetails():Observable<LoginTypeCheck>
  {
     return this._http.get<LoginTypeCheck>('http://localhost:4000/user')
  }
  postsignUpDetails(data:any):Observable<AddLogin>
  {
    return this._http.post<AddLogin>('http://localhost:4000/user',data,{
      headers:{
        'contentType':"application/json"
      }
    })
  }
  postLoginDetails(data:any):Observable<any>
  {
    
    return this._http.post('http://localhost:4000/user/name',data)
  }
  putLoginDeatils(name:string,data:any):Observable<any>
  {
    return this._http.put(`http://localhost:4000/user/${name}/password`,data)
  }
}
