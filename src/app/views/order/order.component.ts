import { Component, inject, OnInit } from '@angular/core';
import { EcommerceServiceService } from '../../service/ecommerce-service.service';
import { LoginServiceService } from '../../service/login-service.service';
import { APIResponse, Customer } from '../../model/Product';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit{

ecomService=inject(EcommerceServiceService);
loginData=inject(LoginServiceService);
cartData: any = [];
loggedUserId: string='';
loggedUser: Customer =new Customer;
totalAmount:number=0;
i:number=0;

ngOnInit(): void {
  
  if (typeof window !== 'undefined') {
    const isUser = localStorage.getItem('shophere');
    console.log(isUser);
    if (isUser != null) {
      const parseObj = JSON.parse(isUser);
      this.loggedUser = parseObj;
    }
    this.totalAmount=0;
    this.getCartItems();
  }
  
}

getCartItems()
 {
  this.totalAmount=0;
  this.ecomService.getCartProducts(this.loggedUser._id).subscribe((res:APIResponse)=>{
    this.cartData=res.data;
    for(this.i=0;this.i<res.data.length;this.i++)
    {
      this.totalAmount=this.totalAmount + (this.cartData[this.i].quantity*this.cartData[this.i].productId.productPrice);
    }
  })
 }
 deleteCartItem(id:string)
 {
   this.ecomService.deleteCartItems(id).subscribe((res)=>{
   this.getCartItems();
   })
 }

}
