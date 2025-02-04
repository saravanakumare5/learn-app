import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpService) { }

  public async addProduct(productDetails: object) {
    try {
      let response = await this.http.postData("/api/product/add-product", productDetails);
      if(response["status"] === "success") {
        return response["message"];
      } else {
        throw new Error("Product added successfully");  
      }
    } catch (error) {
      throw new Error("Product failed to add");
    }
}
}
