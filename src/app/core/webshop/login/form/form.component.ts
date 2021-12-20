import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { LoginService } from 'src/app/core/services/login.service';

export interface Message {
  type: string,
  message: string,
  statuscode?: number;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  message!: Message;

  constructor(public localstorageService: LocalstorageService, public loginService: LoginService, private router: Router) { }

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
    }

    if (remember == true) {
      this.localstorageService.setRememberedUsername(username);
    } else {
      this.localstorageService.setRememberedUsername('')
    }
  }
}
