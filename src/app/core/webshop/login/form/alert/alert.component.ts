import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  show: boolean;
  message: String;

  constructor() { 
    this.show = false;
    this.message = "";

    if(this.message != ""){
      this.show = true;
    }
  }

  ngOnInit(): void {
  }

}