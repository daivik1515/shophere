import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, Customer, LoginCustomer } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class EcommerceServiceService {

  constructor(private http:HttpClient) { }
  Url:string= "http://localhost:3001/";

  //API CALL
  getProducts():Observable<APIResponse>
  {
    return this.http.get<APIResponse>("https://freeapi.miniprojectideas.com/api/amazon/GetAllProducts")
  }
  registerNewCustomer(obj:Customer):Observable<APIResponse>
  {
    // const Url=`${this.Url}/RegisterCutomer`;
    const Url="http://localhost:3001/register";
    return this.http.post<APIResponse>(Url,obj);
  }
  loginCustomer(obj:LoginCustomer):Observable<APIResponse>
  {
    const Url="http://localhost:3001/login";
    return this.http.post<APIResponse>(Url,obj);
  }
}
