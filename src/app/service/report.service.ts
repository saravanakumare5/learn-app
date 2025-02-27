import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private httpService:HttpService) { }

  public async getProductDetails(skip: number,limit: number, data: any) {
    let param = {
        limit: limit,
        skip: skip
    }
    let routeURL = "/api/product/get?limit="+limit+"&skip="+skip;
    try {
        let productDetails = await this.httpService.postData( routeURL, data);
        if(productDetails["status"] === "success" && productDetails["response"]) {
          return productDetails["response"];
        } else {
          throw new Error("Product added successfully");  
        }
    } catch(error) {
      throw new Error("Unable to get the product");
    }
  }
}
