import { Subject, Subscription } from 'rxjs';
import { ProductService } from './../../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  // filteredProducts: any[]
  subscription: Subscription;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
    .subscribe(products => {
      this.products = products.map(
        product => {
          console.log(product);
          return<Product>{
            title: product.$value['title'],
            category: product.$value['category'],
            imageUrl: product.$value['imageUrl'],
            price: product.$value['price'],
            id: product.$key
          }
        }
      );
      this.dtTrigger.next();
    });
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      retrieve: true,
    };
  }

  // filter(query: string) {
  //   this.filteredProducts = (query) ?
  //   this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
  //   this.products;
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

}
