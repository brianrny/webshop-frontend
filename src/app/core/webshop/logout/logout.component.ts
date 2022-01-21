import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  timer: number;

  constructor(private router: Router, private authService: AuthService) {
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
    this.authService.destroySession()

    this.router.navigate(['/'])
  }

}
