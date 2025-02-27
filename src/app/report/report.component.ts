import { Component, OnInit } from '@angular/core';
import { ReportService } from '../service/report.service';
import { test } from '../../assets/product';
import { ProductService } from '../service/product.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent implements OnInit {
  public productDetails: any[] = [];
  public productDetailHeader: any = [{
    "field": "Name",
    "type": "string"
  },
  {
    "field": "Discreption",
    "type": "string"
  },
  {
    "field": "Quantity",
    "type": "number"
  },
  {
    "field": "Price",
    "type": "number"
  },
  {
    "field": "Discount",
    "type": "number"
  },

  {
    "field": "DiscountType",
    "type": "string"
  },

  {
    "field": "SKU",
    "type": "string"
  },
  {
    "field": "BarCode",
    "type": "string"
  },
  {
    "field": "Brand",
    "type": "string"
  },
  ];
  public startIndex = 0;
  public limit = 10;
  public searchValue = "";

  ngOnInit() {
    this.getProductDetails(this.startIndex, this.limit, {});
  }
  constructor(private reportService: ReportService, private productService: ProductService) { }

  async getProductDetails(skip: any, limit: any, data:Object) {
    let response = await this.reportService.getProductDetails(skip, limit, data);
    this.productDetails = this.productDetailMapper(response);
  }

  getNextData(next: any) {
      if(next === "previous" && this.startIndex != 0) {
        this.startIndex -= 10;
        this.getProductDetails(this.startIndex, this.limit, {});
      } else if (next === "next") {
        this.startIndex += 10;
        this.getProductDetails(this.startIndex, this.limit, {});
      }
  }

  async gridSearch() {
    await this.getProductDetails(this.startIndex, this.limit, {"name": this.searchValue});
  }

  sortColumn(colName: any) {
    let productArr = this.productDetails;
    console.log(colName)
    if(colName.type == "string") {
      productArr.sort((a, b) => a[colName["field"]].localeCompare(b[colName["field"]]));
    } else {
      productArr.sort((a, b) => a[colName["field"]] - (b[colName["field"]]));
    }
    
    
  }

  // async addProductList() {
  //   let productLen = 100000;
  //   let end = 80000;
  //   while(productLen >= end) {
  //     this.productDetail.forEach((element)=> {
  //         element["name"] = "Product "+ end;
  //         end += 1;
  //     })
  //     await this.postProduct(this.productDetail);
  //   }
  //   // console.log("this.productDetail", this.productDetail);
  // }

  async postProduct(productList: any) {
    await this.productService.addProductList(productList);
  }

  saveFile() {
    let count = 99995;
    test.forEach(element => {
      count += 1;
      element["name"] = "Product "+ count;
    });
    const jsonStr = JSON.stringify(test, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    console.log(blob);
    FileSaver.saveAs(blob, 'sample.txt');
  }

  

  productDetailMapper(data: any[]) {
    let reqArray: any = [];
    data.forEach(element => {
      let reqObj: any = {};
      reqObj["Id"] = element["_id"];
      reqObj["Name"] = element["name"];
      reqObj["Discreption"] = element["discreption"];
      reqObj["Quantity"] = element["quantity"];
      reqObj["Price"] = element["price"];
      reqObj["Image"] = element["image"];
      reqObj["Discount"] = element["discount"];
      reqObj["DiscountType"] = element["discountType"];
      reqObj["SKU"] = element["sku"];
      reqObj["BarCode"] = element["barcode"];
      reqObj["Brand"] = element["brand"];
      reqArray.push(reqObj);
    });
    return reqArray;
  }
}


