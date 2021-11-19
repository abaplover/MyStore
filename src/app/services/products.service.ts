import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode} from '@angular/common/http'
import { CreateProductDTO, Product } from '../models/product.model';
import { UpdateProductDTO } from '../models/product.model';
import { catchError, retry} from 'rxjs/operators'
import { throwError} from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api/products`;

  constructor(
    private httpClient:HttpClient
  ) { }

  getAllPRoducts(limit?: number, offset?: number){
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
      
    }

    return this.httpClient.get<Product[]>(this.apiUrl, { params })
    .pipe(
      retry(3)
    );

  }
  getProduct(id:string){
    return this.httpClient.get<Product>(`${this.apiUrl}/${id}`)
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
    return this.httpClient.get<Product[]>(`${this.apiUrl}`, {
      params: {limit, offset}
    });
  }

  create(dto: CreateProductDTO){
    return this.httpClient.post<Product>(this.apiUrl, dto );
  }
  update(id:string, dto:UpdateProductDTO){

    return this.httpClient.put<Product>(`${this.apiUrl}/${id}`, dto);

  }

  delete(id:string){
    return this.httpClient.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
