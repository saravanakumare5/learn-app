import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './service/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'learn-app';
  constructor(private router: Router, private loginService: LoginService ) {
    let res = localStorage.getItem('jwt');
    if(res) {
      console.log("check for valid user");
      this.validateUser();
    } else {
      this.router.navigate(['/login']);       
    }
  }

  public async validateUser() {
    try {
      await this.loginService.validateUser();   
    } catch (error) {
      this.router.navigate(['/login']); 
    }
    
  }
}
