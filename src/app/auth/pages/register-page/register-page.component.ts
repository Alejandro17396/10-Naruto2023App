import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Register } from '../../interfaces/login.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';
import { EmailValidator } from '../../validators/email-validator.servcie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

 

  public myForm: FormGroup = this.fb.group({
    //name: ['', [ Validators.required, Validators.pattern( this.validatorsService.firstNameAndLastnamePattern )  ]],
    // email: ['', [ Validators.required, Validators.pattern( this.validatorsService.emailPattern )], [ new EmailValidator() ]],
    email: ['', [ Validators.required, Validators.pattern( this.validatorsService.emailPattern )], [ this.emailValidator ]],
    username: ['', [ Validators.required, this.validatorsService.cantBeStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]],
  }, {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password','password2')
    ]
  });

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidator,
    private authService:AuthService){

  }

  register(){

      var data:Register = {
        username:this.myForm.controls['username'].value,
        password:this.myForm.controls['password'].value,
        enabled:true,
        mail:this.myForm.controls['email'].value,
        roles:[{authority:"ROLE_USER"}]
      }

      this.authService.register(data).subscribe(resp =>{ 
        this.router.navigate(['/auth/login']);
      });
   
    console.log("hecho");
  }

  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.myForm, field );
  }

  onSubmit(){
    if(this.myForm.valid){
    this.myForm.markAllAsTouched();
    this.register();
    }
  }
}
