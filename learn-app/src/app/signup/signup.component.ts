import { Component } from '@angular/core';
import { SignupService } from '../service/signup.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  public signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private signupService: SignupService, private router: Router) {
    this.signUpForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.max(10)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.max(10)])],
      confirmPassword: ['', Validators.required],

    },
      { validators: [this.confirmPasswordValidator] }
    );
  }
  confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    return control.value.password === control.value.confirmPassword ? null : { PasswordNoMatch: true };
  };

  public async onSubmit(isValid: boolean) {
    if (isValid) {
      try {
        let response = await this.signupService.addUser(this.signUpForm.value)
        this.router.navigate(['/login']);        
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("InValid Data");
    }
  }
}
