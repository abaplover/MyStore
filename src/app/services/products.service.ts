import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(
    private httpClient:HttpClient
  ) { }

  getAllPRoducts(){

    return this.httpClient.get<Product[]>(this.apiUrl);

  }
  getProduct(id:string){
    return this.httpClient.get<Product>(`${this.apiUrl}/${id}`);
  }
}
