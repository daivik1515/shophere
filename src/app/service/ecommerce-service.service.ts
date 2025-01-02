import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, Customer, LoginCustomer } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class EcommerceServiceService {

  constructor(private http:HttpClient) { }
  Url:string= "https://freeapi.miniprojectideas.com/api/amazon";

  //API CALL
  getProducts():Observable<APIResponse>
  {
    return this.http.get<APIResponse>("https://freeapi.miniprojectideas.com/api/amazon/GetAllProducts")
  }
  registerNewCustomer(obj:Customer):Observable<APIResponse>
  {
    // const Url=`${this.Url}/RegisterCutomer`;
    const Url="/api/amazon/RegisterCustomer";
    return this.http.post<APIResponse>(Url,obj);
  }
  loginCustomer(obj:LoginCustomer):Observable<APIResponse>
  {
    const Url="/api/amazon/Login";
    return this.http.post<APIResponse>(Url,obj);
  }
}
