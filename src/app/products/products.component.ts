import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../services/category.service';
import { ProductService } from './../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categoryRoute: string;
  cart: any;
  subscription: Subscription;


  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private cartService: ShoppingCartService) {
    this.productService.getAll()
    .subscribe(products => {
      this.products = products.map(
        product => {
          return<Product>{
            title: product.$value['title'],
            category: product.$value['category'],
            imageUrl: product.$value['imageUrl'],
            price: product.$value['price'],
            id: product.$key
          }
        }
      );

    this.route.queryParamMap.subscribe(params => {
      this.categoryRoute = params.get('category');

      this.filteredProducts = (this.categoryRoute) ?
      this.products.filter(p => p.category === this.categoryRoute) :
        this.products;
    })

    });



  }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart())
      .subscribe(cart => {
        this.cart = cart;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
