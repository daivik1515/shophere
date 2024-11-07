import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../model/Product';

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
}
