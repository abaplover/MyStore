import { Component, OnInit, Input, Output } from '@angular/core';

import { Product } from '../../../models/product.model';

import { switchMap } from 'rxjs/operators';
import { zip } from 'rxjs';

import { CreateProductDTO } from '../../../models/product.model';

import { StoreService } from '../../../services/store.service';
import { ProductsService } from 'src/app/services/products.service';
//import { EventEmitter } from 'stream';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  myShoppingCart: Product[] = [];
  total = 0;
  @Input() products: Product[] = [];
  @Input() set productId(id: string | null){
    if(id){
      this.onShowDetail(id);
    }
  }
  @Output() loadMore = new EventEmitter();
  showProductDetail = false;

  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    description: '',
    category:{
      id: '',
      name: ''
  }
};

statusDetail : 'loading' | 'success'  | 'error' | 'init' = 'init';

  today = new Date();
  date = new Date(2021,1,21);

  constructor(
    private storeService: StoreService,
    private productService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }
  onShowDetail(id: string){
    this.statusDetail = 'loading';
    this.toggleProductDetail();
    if (!this.showProductDetail) {
      this.showProductDetail = true;
    }

    this.productService.getProduct(id)
    .subscribe(data => {

      this.productChosen = data;
      this.statusDetail = 'success';
    }, response => {
      window.alert(response);
      this.statusDetail = 'error';

    })
  }

  createNewProduct(){
    const product : CreateProductDTO = {

      title: 'Nuevo producto',
      description: ' Nuevo producto para probar post en API',
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      categoryId: 2,
      price: 1000
    }
    this.productService.create(product)
    .subscribe(data => {
      console.log('Create:', data);
      this.products.unshift(data);
    });
  }
  updateProduct(){
    const changes = {
      title: 'Nuevo titulo klk',
    }
    const id = this.productChosen.id;
    this.productService.update(id,changes)
    .subscribe(data => {
      console.log('Updated:', data);
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
      this.productChosen = data;
    })

  }

  readAndUpdate(id: string){
    this.productService.getProduct(id)
    .pipe(
      switchMap((product) =>  this.productService.update(product.id, {title: 'change'})
      )
    )
    .subscribe( data => {
      console.log(data);
    });

    this.productService.fetchReadAndUpdate(id, {title: 'change'})
    .subscribe(response => {
      const read = response[0];
      const update = response[1];
    })

  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.productService.delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }
  onLoadMore(){

    this.loadMore.emit();
  }

}
