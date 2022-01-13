import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from './localstorage.service';
import UserService from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authenticated!: boolean;
  is_redirected!: boolean;

  constructor(private http: HttpClient, private localstorageService: LocalstorageService, private router: Router, private userService: UserService) {
    this.is_redirected = false;

    if (this.localstorageService.getStorageItem("webshop_stored_token") != null) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
  }

  login(data: any) {
    let credentials = { username: data.value.username, password: data.value.password };
    return this.http.post(`${environment.BASE_API_URL}` + 'login', credentials)
  }

  logout() {
    this.destroySession();

    setTimeout(() => this.router.navigate(['/logout']))
  }

  register(data: any) {
    let userInformation = {
      firstname: data.value.firstname,
      insertion: data.value.insertion,
      lastname: data.value.lastname,
      phonenumber: data.value.phonenumber,
      streetname: data.value.streetname,
      housenumber: data.value.housenumber,
      zipcode: data.value.zipcode,
      email: data.value.email,
      username: data.value.username,
      password: data.value.password,
      role: "USER"
    }

    return this.http.post(`${environment.BASE_API_URL}` + 'register', userInformation);
  }

  createSession(data: any) {
    let { jwtToken, userid } = data;

    this.localstorageService.setStorageItem("webshop_stored_token", jwtToken.token);
    this.localstorageService.setStorageItem("webshop_user_id", userid);

    this.userService.initializeUser(userid)

    this.setAuthenticated(true);

    if (this.getRedirected() == true) {
      setTimeout(() => {
        this.router.navigate(['/order'])
      }, 2500)
    } else {
      setTimeout(() => {
        this.router.navigate(['/'])
      }, 2500)
    }
  }

  destroySession() {
    this.localstorageService.removeStorageItem("webshop_stored_token");
    this.localstorageService.removeStorageItem("webshop_user_id");

    this.userService.uninitializeUser()

    this.setAuthenticated(false)
  }

  isAuthenticated() {
    return this.authenticated == true;
  }

  getAuthenticated() {
    return this.authenticated;;
  }

  setAuthenticated(value: boolean) {
    this.authenticated = value;
  }

  getRedirected() {
    return this.is_redirected;
  }

  setIsRedirected(value: boolean) {
    this.is_redirected = value;
  }
}
