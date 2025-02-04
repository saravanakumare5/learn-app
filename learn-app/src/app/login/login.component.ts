import { Component } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userName = "";
  password = "";
  loginResponse = '';
  constructor(private loginService: LoginService, private router: Router) {}

  async login() {
    let reqObj = {
      "username": this.userName,
      "password": this.password
    }
    try {
      let response = await this.loginService.login(reqObj);      
      localStorage.setItem('jwt', response['jwt']);
      this.router.navigate(['/add-product']);        
    } catch (error: any) {
      this.loginResponse = error.toString();
    }    
  }
}
