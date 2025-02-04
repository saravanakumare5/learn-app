import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpService) { }

  public async addUser(userDetail: object) {
      try {
        let response = await this.http.postData("/api/signup/addUser", userDetail);
        if(response["status"] === "success") {
          return response["message"];
        } else {
          throw new Error("SignUp failed");  
        }
      } catch (error) {
        throw new Error("SignUp failed");
      }
  }
}
