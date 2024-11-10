import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'shophere';
  showRegister:boolean=false;
  showLogin:boolean=false;
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
 
}
