import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, cart, Customer, LoginCustomer } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class EcommerceServiceService {

  constructor(private http:HttpClient) { }
  Url:string= "http://localhost:3001/";

  //API CALL
  getProducts():Observable<APIResponse>
  {
    return this.http.get<APIResponse>("http://localhost:3001/appProducts")
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
  addToCart(obj:cart):Observable<APIResponse>
  {
    const Url="http://localhost:3001/addtocart"
    return this.http.post<APIResponse>(Url,obj);
  }
  
  getCartProducts(id:string):Observable<APIResponse>
  {
    const Url=`http://localhost:3001/getcustomercart/${id}`;
    return this.http.get<APIResponse>(Url);
  }
  deleteCartItems(id:string):Observable<APIResponse>
  {
    const Url=`http://localhost:3001/deletecartitem/${id}`
    return this.http.delete<APIResponse>(Url);
  }
}
