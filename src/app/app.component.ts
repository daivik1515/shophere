import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; //For ngFor and ngIf
import { APIResponse, Customer, LoginCustomer } from './model/Product';
import {FormsModule} from '@angular/forms';
import { EcommerceServiceService } from './service/ecommerce-service.service';
import { Routes } from '@angular/router';
import { OrderComponent } from './views/order/order.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'shophere';
  showRegister:boolean=false;
  showLogin:boolean=false;
  isloggedIn:boolean=false;
  registerCustomer:Customer=new Customer();
  loginCustomer:LoginCustomer=new LoginCustomer();
  loggedUser:Customer=new Customer();
  ecomService=inject(EcommerceServiceService)
  

  constructor(private router: Router)
  {
    this.isloggedIn=false;
  }
  ngOnInit(): void {
    // Check if running in a browser environment before using localStorage
    if (typeof window !== 'undefined') {
      const isUser = localStorage.getItem('shophere');
      console.log(isUser);
      if (isUser != null) {
        this.isloggedIn = true;
        const parseObj = JSON.parse(isUser);
        this.loggedUser = parseObj;
      }
    }
  }
  openSignUp(){
    if(this.showLogin==true)
      this.showLogin=false;
    this.showRegister=true;
  }
  openLogIn()
  {
    if(this.showRegister==true)
      this.showRegister=false;
    this.showLogin=true;
  }
 closeLogin()
 {
  this.showLogin=false;
 }
 closeRegister()
 {
  this.showRegister=false;
 }

 onRegister()
 {
  this.ecomService.registerNewCustomer(this.registerCustomer).subscribe((res:APIResponse)=>{
    if(res.result==true)
    {
      alert("Registration Success!");
      this.showRegister=false;
    }
    else
    {
      alert(res.message);
    }
    
  })
 }

 onLogin()
 {
  this.ecomService.loginCustomer(this.loginCustomer).subscribe((res:APIResponse)=>{
    if(res.result==true)
    {
      //storing the data
      this.loggedUser=res.data;
      localStorage.setItem('shophere',JSON.stringify(res.data));
      this.showLogin=false;
      window.location.href = window.location.href
    }
    else
    {
      alert(res.message);
    }
    this.showLogin=false;
  })
 }
 logout()
 {
  this.isloggedIn=false;
  localStorage.removeItem('shophere');
  
 }
}
