import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { retry, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  limit = 20;
  offset = 1;
  products: Product[] = [];
  productId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.categoryId = params.get('id');
          if (this.categoryId) {
            return this.productService.getByCategory(this.categoryId, this.limit, this.offset)
          }
          return [];
        })
      )
      .subscribe(data => {
        this.products = data;
      })

      this.route.queryParamMap
       .subscribe( params => {
         this.productId = params.get('product');
       })

  }

  onLoadMore() {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.categoryId = params.get('id');
          if (this.categoryId) {
            return this.productService.getByCategory(this.categoryId, this.limit, this.offset)
          }
          return [];
        })

      ).subscribe((data) => {
        this.products = this.products.concat(data);
        this.offset += this.limit
      })
  }

}
