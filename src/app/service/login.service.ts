import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseURL = 'http://localhost:5000/'
  

  constructor(private http:HttpService) { }
  public async login(userDetail: object) {
      try {
       let response = await this.http.postData('/api/login/', userDetail);
       if(response['status'] === "success") {
        return response;
       } else {
        throw new Error(response['message'].toString());
       }
      } catch (error: any) {
        throw new Error("Invalid token");
      }
  }

  public async validateUser() {
    try {
     let response = await this.http.getData('/api/login/', {});
     if(response['status'] === "success") {
      return response;
     } else {
      throw new Error("Invalid token");
     }
    } catch (error: any) {
      throw new Error("Invalid token");
    }
}
}
