import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  warningMessages: string[];
  headsupMessage?: string;

  registeredMessage?: { type: string | undefined, message: string };

  password: string;
  confirmedPassword: string;
  passwordsMatch: boolean;

  showPassword: boolean;

  rate: number;
  maxRates: number = 5;

  constructor(private authService: AuthService, private router: Router) {
    this.rate = 0;
    this.warningMessages = [];

    this.password = '';
    this.confirmedPassword = '';

    this.showPassword = false;

    this.passwordsMatch = false;

    this.registeredMessage = { type: undefined, message: "" };


    if (this.warningMessages.length == 0) {
      this.headsupMessage = "Your password is strong!!!";
    }
  }

  ngOnInit(): void {
  }

  passwordValidate(event: Event) {
    let messagesList = [];
    let passwordValue = (event.target as HTMLInputElement).value;

    if (!passwordValue.search(/^(?=.*\s)/)) {
      messagesList.push("Your password contains whitespace.")
    }

    if (passwordValue.search(/^.{10,32}$/)) {
      messagesList.push("Your password doesnt contain atleast 10 characters or has more than 32 characters.")
    }
    if (passwordValue.search(/^(?=.*[A-Z])/)) {
      messagesList.push("Your password doesnt contain a capitalized character.")
    }

    if (passwordValue.search(/^(?=.*[a-z])/)) {
      messagesList.push("Your password doesnt contain a small character.")
    }

    if (passwordValue.search(/^(?=.*[0-9])/)) {
      messagesList.push("Your password doesnt contain a number.")
    }

    if (passwordValue.search(/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/)) {
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

  onFormSubmit(formdata: any) {
    if (this.warningMessages.length == 0 && this.passwordsMatch) {
      this.authService.register(formdata).subscribe(
        () => null,
        (err: { error: { text: any; }; }) => {
          let message = err.error.text;

          if (message = "User has been created.") {
            this.registeredMessage = { type: "success", message: "You have succesfully registered." }

            this.authService.login({ username: formdata.value.username, password: formdata.value.password }).subscribe(
              (res: any) => this.authService.createSession(res),
              (err: any) => console.error(err),
              () => null
            );

            setTimeout(() => {
              this.router.navigate(['/']);
            }, 1000)

          } else {
            this.registeredMessage = { type: "failed", message: "Something went wrong, try again or check if you filled in the required fields." }
          }
        },
        () => null
      )
    }
  }
}
