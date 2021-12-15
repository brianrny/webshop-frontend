import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/localstorage.service';

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

  logged_in: boolean;

  constructor(private window: Window, localStorageService: LocalstorageService) { 
    this.collapsed = false;
    this.logged_in = true;

    this.localStorageService = localStorageService;

    if(this.window.innerWidth <= 768){
      this.collapsed = true;
    }
  }

  ngOnInit(): void {
  }

  onCollapse(){
    this.collapsed = !this.collapsed;
  }

  onResize(){
    if(this.window.innerWidth <= 768){
      this.collapsed = true;
    } else{
      this.collapsed = false;
    }
  }

  onLogin(){
    this.logged_in = true;
  }

  onLogout(){
    this.logged_in = false;
  }
}
