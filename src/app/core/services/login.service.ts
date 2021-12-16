import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  logged_in!: boolean;

  constructor() { 
    this.logged_in = false;
  } 

  getLoginState(){
    return this.logged_in;
  }
}
