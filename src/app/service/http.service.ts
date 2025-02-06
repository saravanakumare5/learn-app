import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseURL = 'http://localhost:5000'
  constructor(private http: HttpClient) { }



  public postData(url: string, data: object): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.http.post(this.baseURL + url, data).subscribe((response: any) => {
          resolve(response);
        }, (err) => {
          console.log(err)
          reject(err);
        })
      } catch (error) {
        console.log("error", error)
        reject(error);
      }
    })
  }

  public getData(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.http.get(this.baseURL + url).subscribe((response: any) => {
          resolve(response);
        }, (err) => {
          console.log("err", err);
          reject(err);
        })
      } catch (error) {
        console.log("error", error)
        reject(error);
      }
    })
  }
}
