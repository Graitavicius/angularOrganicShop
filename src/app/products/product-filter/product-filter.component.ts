import { CategoryService } from './../../services/category.service';
import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/categories.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories$;
  @Input('category') categoryRoute;

  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute) {
    this.categoryService.getCategories()
    .subscribe(categories => {
      this.categories$ = categories.map(category => {
        return <Category>{
          name: category.key
        }
      });
    });
  }
}
