import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { LoginService } from '../services/login.service';
import UserService from '../services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class NavigationComponent implements OnInit {
  localStorageService: LocalstorageService;
  loginService: LoginService;
  collapsed: boolean;

  constructor(private window: Window, localStorageService: LocalstorageService, loginService: LoginService, public userService: UserService) {
    this.collapsed = false;

    this.localStorageService = localStorageService;
    this.loginService = loginService;

    if (this.window.innerWidth <= 768) {
      this.collapsed = true;
    }
  }

  ngOnInit(): void {
  }

  onCollapse() {
    this.collapsed = !this.collapsed;
  }

  onResize() {
    if (this.window.innerWidth <= 768) {
      this.collapsed = true;
    } else {
      this.collapsed = false;
    }
  }
}
