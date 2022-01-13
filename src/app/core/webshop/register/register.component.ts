import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  warningMessages: string[];
  headsupMessage?: string;

  registeredMessage?: string;

  password: string;
  confirmedPassword: string;
  passwordsMatch: boolean;

  showPassword: boolean;

  rate: number;
  maxRates: number = 5;

  constructor(private loginService: LoginService) {
    this.rate = 0;
    this.warningMessages = [];

    this.password = '';
    this.confirmedPassword = '';

    this.showPassword = false;

    this.passwordsMatch = false;

    this.registeredMessage = '';


    if (this.warningMessages.length == 0) {
      this.headsupMessage = "Your password is strong!!!";
    }
  }

  ngOnInit(): void {
  }

  // passwordMatchValidator(password: string, confirmedPassword: string) {
  //   if (password !== confirmedPassword) this.messages?.push("The passwords do not match.")

  //   if (password == confirmedPassword) return
  // }

  passwordValidate(event: Event) {
    let messagesList = [];
    let passwordValue = (event.target as HTMLInputElement).value;

    if (!passwordValue.search(/^(?=.*\s)/)) {
      messagesList.push("Your password contains whitespace.")
    }

    if (!passwordValue.search(/^.{10,16}$/)) {
    } else {
      messagesList.push("Your password doesnt contain 10 or more characters.")
    }

    if (!passwordValue.search(/^(?=.*[A-Z])/)) {
    } else {
      messagesList.push("Your password doesnt contain a capitalized character.")
    }

    if (!passwordValue.search(/^(?=.*[a-z])/)) {
    } else {
      messagesList.push("Your password doesnt contain a small character.")
    }

    if (!passwordValue.search(/^(?=.*[0-9])/)) {
    } else {
      messagesList.push("Your password doesnt contain a number.")
    }

    if (!passwordValue.search(/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/)) {
    } else {
      messagesList.push("Your password doesnt contain a special character.")
    }

    this.warningMessages = [...new Map(messagesList.map((item) => [item, item])).values()] || []
  }

  passwordMatch(password: string, confirmedPassword: string): boolean {
    return (password == confirmedPassword) ? this.passwordsMatch = true : this.passwordsMatch = false;
  }

  revealPassword() {
    this.showPassword = !this.showPassword;

    let passwordElem = document.getElementById('password') as HTMLInputElement
    let confirmedPasswordElem = document.getElementById('confirmPassword') as HTMLInputElement

    if (this.showPassword == true) {
      passwordElem.type = "text";
      confirmedPasswordElem.type = "text"
    } else {
      passwordElem.type = "password";
      confirmedPasswordElem.type = "password"
    }
  }

  onFormSubmit(data: any) {
    if (this.warningMessages.length == 0 && this.passwordsMatch) {
      this.loginService.register(data).subscribe(
        data => console.log(data),
        err => console.error(err.error.text),
        () => console.log("finished")
      )
    }
  }
}
