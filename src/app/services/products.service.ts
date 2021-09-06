import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../models/Products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private APP_URL:string = "http://localhost:50451/api/";
  private apiURL:string;

  constructor(private _http:HttpClient) { 

    this.apiURL = "";
  }

  CreateNewProduct(products:Products): Observable<any>{
console.log(products)
    this.apiURL = "Product/create";
    return this._http.post(this.APP_URL + this.apiURL, products);

  }

  UpdateProduct(products:Products): Observable<any>{

    this.apiURL = "Product/update";
    return this._http.put(this.APP_URL + this.apiURL, products);
  }


  DeleteProduct(productId:number): Observable<any>{

    this.apiURL = "Product/delete/";
    return this._http.delete(this.APP_URL + this.apiURL + productId);
  }
  GetListProducts(): Observable<any>{

    this.apiURL = "Product/listProducts";
    return this._http.get(this.APP_URL + this.apiURL);
  }

  GetProductDetailById(productId:number): Observable<any>{
    this.apiURL = "Product/productsById/";
    return this._http.get(this.APP_URL + this.apiURL + productId);
  }

}
