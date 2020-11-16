import { Subscription } from 'rxjs';
import { ProductService } from './../../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[];
  filteredProducts: any[]
  subscription: Subscription;

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    this.subscription = this.productService.getAll().subscribe(products => {
      this.filteredProducts = this.products = products;
    });
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
    this.products.filter(p => p.$value.title.toLowerCase().includes(query.toLowerCase())) :
    this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
