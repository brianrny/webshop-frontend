import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  constructor(public localstorageService: LocalstorageService, public loginService: LoginService) {

  }

  ngOnInit(): void {
  }

  onFormSubmit(data: any) {
    let username = data.value.username;
    let password = data.value.password;
    let remember = data.value.remember;

    if (username != '' && password != '') {
      this.loginService.login(data).subscribe(data => {
        console.group(data)
      })
    }

    if (remember == true) {
      this.localstorageService.setRememberedUsername(username);
    } else {
      this.localstorageService.setRememberedUsername('')
    }
  }
}
