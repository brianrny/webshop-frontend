import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/shared/models/product.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() product!: Product

  editable: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  onEditProduct(id: number, product: Product) {
    this.productService.editProduct(id, product).subscribe(
      () => {
        console.log("Succesfully edited");

        this.editable = false;
      },
      () => {
        console.log("Something went wrong");

        this.editable = false;
      }
    )
  }

  onDeleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      () => {
        console.log("Succesfully deleted");
        this.editable = false;

        window.location.reload()
      },
      (err) => {
        console.log("Something went wrong");

        console.log(err);
        

        this.editable = false;

      }
    )
  }

  toggleEditable() {
    this.editable = !this.editable;
  }

}
