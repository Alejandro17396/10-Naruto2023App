import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  username:string = '';
  password:string = '';

  public myForm: FormGroup = this.fb.group({
    //name: ['', [ Validators.required, Validators.pattern( this.validatorsService.firstNameAndLastnamePattern )  ]],
    // email: ['', [ Validators.required, Validators.pattern( this.validatorsService.emailPattern )], [ new EmailValidator() ]],
    //email: ['', [ Validators.required, Validators.pattern( this.validatorsService.emailPattern )], [ this.emailValidator ]],
    username: ['', [ Validators.required]],
    password: ['', [ Validators.required]],
    //password2: ['', [ Validators.required ]],
  });

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private validatorsService: ValidatorsService,
    private authService:AuthService){

  }

  login(){

      this.authService.login( this.myForm.controls['username'].value,
                              this.myForm.controls['password'].value).subscribe(
          respuesta => {
                    console.log(respuesta);
                    this.router.navigate(['/sets/search']);
          });

    
    /**/
  }

  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.myForm, field );
  }

  onSubmit(){
    if(this.myForm.valid){
      this.password = this.myForm.controls['password'].value;
      this.username = this.myForm.controls['username'].value;
      this.login();
      console.log(this.username + " " +this.password);
    }
  }

}
