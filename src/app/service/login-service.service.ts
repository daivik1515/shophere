import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  loggedInService=new BehaviorSubject<boolean>(false);
  cartItemInsertTrigger: Subject<boolean>=new Subject<boolean>();
  loggedUserId:BehaviorSubject<string>=new BehaviorSubject<string>('');
  
  constructor() { }
  changeLoginStatusToLogin()
  {
    this.loggedInService.next(true);
  }
  changeLoginStatusToLogout()
  {
    this.loggedInService.next(false);
  }
  changecartItemInsertTriggerTrue()
  {
    this.cartItemInsertTrigger.next(true);
  }
  changecartItemInsertTriggerFalse()
  {
    this.cartItemInsertTrigger.next(false);
  }

  setLoggedUserId(id:string)
  {
    this.loggedUserId.next(id);
    console.log(this.loggedUserId.value);
  }
}
