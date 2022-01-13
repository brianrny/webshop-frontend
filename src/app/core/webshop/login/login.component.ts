import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../services/localstorage.service';
import { LoginService } from '../../services/login.service';

export interface Message {
  type: string,
  message: string,
  statuscode?: number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message!: Message;

  constructor(public localstorageService: LocalstorageService, public loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onFormSubmit(data: any) {
    let username = data.value.username;
    let password = data.value.password;
    let remember = data.value.remember;

    // Meer specifiekere check voor authenticatie
    if (username != '' && password != '') {
      this.loginService.login(data).subscribe(
        res => {
          this.message = { type: "success", message: "Succesfully logged in. Redirecting in 2 seconds..." }
          this.loginService.createSession(res);
        },
        err => {
          this.message = { type: "failed", message: "Login failed, try again.", statuscode: err.error.status }
        }
      )
    } else {
      this.message = { type: "failed", message: "Please enter a username and password" }
    }

    if (remember == true) {
      this.localstorageService.setStorageItem("webshop_stored_username", username);
    } else {
      this.localstorageService.setStorageItem("webshop_stored_username", '')
    }
  }
}
