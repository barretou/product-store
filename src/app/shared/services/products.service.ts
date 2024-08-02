import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Product } from '../interfaces/product.interface';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  _httpClient = inject(HttpClient)

  getAll() {
    return this._httpClient.get<Product[]>("/api/products");
  }

  create(newProduct: { title : string }) {
    return this._httpClient.post("/api/products", newProduct);
  }
}
