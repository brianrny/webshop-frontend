import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';

@Component({
  selector: 'app-previous',
  templateUrl: './previous.component.html',
  styleUrls: ['./previous.component.css']
})
export class PreviousComponent implements OnInit {
  @Input() targetPath: string;

  constructor(private appRouter: AppRoutingModule) {

    this.targetPath = "/"
  }

  ngOnInit(): void {
  }
}
