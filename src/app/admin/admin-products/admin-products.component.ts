import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$;

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    this.products$ = this.productService.getAll();
  }


}
