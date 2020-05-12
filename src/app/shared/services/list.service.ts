import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

import { Product } from '../models';
import { HttpUtilService } from './http-util.service';

@Injectable()
export class ListService {

  private readonly PATH: string = 'products';
  private readonly PATH_ALL_PROD = '/product/findAllProduct';

  constructor(
  	private http: HttpClient,
  	private httpUtil: HttpUtilService) { }

  findAllProduct(): Observable<any> {
    return this.http.get(
        env.baseApiUrl + this.PATH + 
          this.PATH_ALL_PROD,
        this.httpUtil.headers()
    );
  }

  registerProduct(product: Product): Observable<any> {
    return this.http.post(
        env.baseApiUrl + this.PATH, 
        product,
        this.httpUtil.headers()
    );
  }

  findById(productId: string): Observable<any> {
    return this.http.get(
        env.baseApiUrl + this.PATH + '/' + productId,
        this.httpUtil.headers()
    );
  }

  remove(productId: string): Observable<any> {
    return this.http.delete(
        env.baseApiUrl + this.PATH + '/' + productId,
        this.httpUtil.headers()
    );
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put(
        env.baseApiUrl + this.PATH + '/' + product.id, 
        product,
        this.httpUtil.headers()
    );
  }

}
