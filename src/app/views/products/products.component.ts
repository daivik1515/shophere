import { Component,inject,OnInit, signal } from '@angular/core';
import { EcommerceServiceService } from '../../service/ecommerce-service.service';
import { APIResponse, cart, Customer, ProductData } from '../../model/Product';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginServiceService } from '../../service/login-service.service';
import { FormsModule } from '@angular/forms';
import { FilterProductsPipe } from '../../pipes/filter-products.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,FormsModule,FilterProductsPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  
  searchTerm = signal('');
  
  ecomService=inject(EcommerceServiceService);
  loginData=inject(LoginServiceService)
  data: ProductData[] = [];
  cartData:cart = new cart();
  loggedUser:Customer=new Customer();;
  showDialog:boolean=false;
  constructor()
  {
    if (typeof window !== 'undefined') {
      const isUser = localStorage.getItem('shophere');
      console.log(isUser);
      if (isUser != null) {
        const parseObj = JSON.parse(isUser);
        this.loggedUser = parseObj;
      }
    }
  }

  ngOnInit(): void {
  this.displayProducts()
 }

  displayProducts()
  {
    this.ecomService.getProducts().subscribe((res:APIResponse)=>{
      this.data=res.data;
    })
  }
  addToCartButton(product:ProductData)
  {
    if(this.loginData.loggedInService.value)
    {
    this.cartData.productId=product._id;
    this.cartData.custId=this.loggedUser._id;
    //console.log(this.loggedUser._id);
    this.ecomService.addToCart(this.cartData).subscribe((res:APIResponse)=>{
      if(res.result)
      {
        this.loginData.changecartItemInsertTriggerTrue();
        this.loginData.cartItemInsertTrigger.next(true);
      }
      else
      {
        alert("Error occured");
      }
    })
    }
    else
    {
      this.showDialog=true;
      console.log("Please login to continue");
    }
  }
  closeDialog()
  {
    this.showDialog=false;
  }
}
