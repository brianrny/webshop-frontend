import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-previous',
  templateUrl: './previous.component.html',
  styleUrls: ['./previous.component.css']
})
export class PreviousComponent implements OnInit {
  @Input() targetPath: string;

  constructor() { 
    this.targetPath = "/"
  }

  ngOnInit(): void {
  }
}
