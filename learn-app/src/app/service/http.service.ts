import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseURL = 'http://localhost:5000'
  constructor(private http:HttpClient) { }



  public postData(url: string, data: object): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        let token: any = localStorage.getItem('jwt');
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',  // Set Content-Type header
          'Authorization': token,  // Set Authorization header (if needed)
        });
        this.http.post(this.baseURL + url, data, {headers}).subscribe((response: any) => {
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
        let token: any = localStorage.getItem('jwt');
        console.log("token", token);
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',  // Set Content-Type header
          Authorization: token,  // Set Authorization header (if needed)
        });
        this.http.get(this.baseURL + url, {headers}).subscribe((response: any) => {
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
