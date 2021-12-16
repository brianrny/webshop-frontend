import { Component, OnInit } from '@angular/core';
import { Product } from 'src/shared/models/product.model';

import { WebshopService } from '../services/webshop.service';

@Component({
  selector: 'app-webshop',
  templateUrl: './webshop.component.html',
  styleUrls: ['./webshop.component.css']
})
export class WebshopComponent implements OnInit {
  public webshopService: WebshopService

  constructor(webshopService: WebshopService) { 
    this.webshopService = webshopService;
  }

  ngOnInit(): void {

  }
}
