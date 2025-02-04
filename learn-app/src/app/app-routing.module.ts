import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { HeaderComponent } from './header/header.component';
import {AddProductComponent} from './add-product/add-product.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'singup', component: SignupComponent},
  {path: 'home', component: HomepageComponent,
    children: [
      {
        path: 'product', 
        component: AddProductComponent,
      },
    ],
  },
  {path: '**', component: HomepageComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
