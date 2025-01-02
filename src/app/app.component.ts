import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; //For ngFor and ngIf
import { APIResponse, Customer, LoginCustomer } from './model/Product';
import {FormsModule} from '@angular/forms';
import { EcommerceServiceService } from './service/ecommerce-service.service';


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
  registerCustomer:Customer=new Customer();
  loginCustomer:LoginCustomer=new LoginCustomer();
  ecomService=inject(EcommerceServiceService)
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
      localStorage.setItem('shophere',JSON.stringify(res.data))
      this.showLogin=false;
    }
    else
    {
      alert(res.message);
    }
    this.showLogin=false;
  })
 }
}
