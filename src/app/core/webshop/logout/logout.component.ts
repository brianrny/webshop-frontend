import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  timer: number;

  constructor(private router: Router, private loginService: LoginService) {
    this.timer = 5;

    this.startTimer()
  }

  ngOnInit(): void {
  }

  startTimer() {
    // setInterval(() => {
    //   this.timer -= 1

    //   if (this.timer == -1) {
    //     this.loginService.destroySession()

    //     this.router.navigate(['/'])
    //   }
    // }, 1000)
    this.loginService.destroySession()

    this.router.navigate(['/'])
  }

}
