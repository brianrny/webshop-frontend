import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { AuthService } from '../services/auth.service';
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
  collapsed: boolean;

  constructor(private window: Window, localStorageService: LocalstorageService, public authService: AuthService, public userService: UserService) {
    this.collapsed = false;

    this.localStorageService = localStorageService;

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
