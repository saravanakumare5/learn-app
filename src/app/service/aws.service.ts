import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})

export class AWSService {
    baseURL = 'http://localhost:5000/'

    constructor(private http:HttpService) { }

    public async getPreSignedURL(fileDetail: object) {
        try {
            let response = await this.http.postData('/api/aws/getPreSignedURL',fileDetail);
            if(response["status"] === "success") {
                return response["signedUrl"];
              } else {
                throw new Error("unable to get presigned url");
              }
        } catch (error) {
            throw new Error("unable to get presigned url");  
        }
    }
}