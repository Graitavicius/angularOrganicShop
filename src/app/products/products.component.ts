import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../services/category.service';
import { ProductService } from './../services/product.service';
import { Component } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categoryRoute: string;


  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private route: ActivatedRoute) {
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


}
