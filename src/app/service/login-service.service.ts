import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  loggedInService=new BehaviorSubject<boolean>(false);
  constructor() { }
  changeLoginStatusToLogin()
  {
    this.loggedInService.next(true);
  }
  changeLoginStatusToLogout()
  {
    this.loggedInService.next(false);
  }
}
