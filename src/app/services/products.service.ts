import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode} from '@angular/common/http'
import { CreateProductDTO, Product } from '../models/product.model';
import { UpdateProductDTO } from '../models/product.model';
import { catchError, retry, map} from 'rxjs/operators'
import { throwError, zip} from 'rxjs'
import { environment } from 'src/environments/environment';
import { checkTime, TimeInterceptor } from '../interceptors/time.interceptor';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api`;

  constructor(
    private httpClient:HttpClient
  ) { }

  getByCategory(categoryId: string, limit?: number, offset?: number){
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
      
    }
    return this.httpClient.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, {params} )
  }

  getAllPRoducts(limit?: number, offset?: number){
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
      
    }

    return this.httpClient.get<Product[]>(`${this.apiUrl}/products`, { params, context: checkTime() })
    .pipe(
      retry(3),
      map( products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );

  }

  fetchReadAndUpdate(id: string, dto:UpdateProductDTO){
    return zip(
      this.getProduct(id),
      this.update(id, {title: 'nuevo'})
    );
  }

  getProduct(id:string){
    return this.httpClient.get<Product>(`${this.apiUrl}/products/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError('Aprende a programar mmg');  
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('El producto no existe');  
        }
        return throwError('Ups se fue a la verga');
      })
    );
  }

  getProductByPage(limit: number, offset: number){
    return this.httpClient.get<Product[]>(`${this.apiUrl}/products`, {
      params: {limit, offset}
    });
  }

  create(dto: CreateProductDTO){
    return this.httpClient.post<Product>(`${this.apiUrl}/products`, dto );
  }
  update(id:string, dto:UpdateProductDTO){

    return this.httpClient.put<Product>(`${this.apiUrl}/products/${id}`, dto);

  }

  delete(id:string){
    return this.httpClient.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }
}
