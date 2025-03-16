import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IConfig } from 'ngx-countries-dropdown';
import {RegistrationRequest} from '../../../core/models/registration-request';
import {Router} from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registrationForm!: FormGroup;
  selectedCountry: string | null = null;
  showPassword = false;
  title = "";
  roleValue = "";
  registerRequest: RegistrationRequest = {username: '',
                                          email: '', 
                                          password: '', 
                                          companyName: '', 
                                          country: '',                                          
                                          phoneNumber1: 0, 
                                          firstname: '', 
                                          lastname: '', 
                                          role:[]
                                        };
                                          
  errorMsg: Array<string> = [];
  successMsg: string = '';


  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService
              ) {}

  ngOnInit() {
    this.initSignUpForm();
  }
  initSignUpForm() {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      countryCode: ['+216', Validators.required],
      companyName: ['', Validators.required],
      phoneNumber1: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: [["USER"], Validators.required],
      termsAccepted: [false, Validators.requiredTrue],
    });
    this.roleValue = this.registrationForm.get("role")?.value[0];
    this.title = `Create ${this.roleValue && this.roleValue?.toLowerCase()} Account`;
  }

  singIn(){
    this.router.navigate(['/auth/signin']);

  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onRoleChange(event: any) {
    this.roleValue = this.registrationForm.get("role")?.value[0];
    this.title = `Create ${this.roleValue && this.roleValue?.toLowerCase()} Account`;
  }


  config: IConfig = {

  };

  onCountryChange(event: any) {

    this.registrationForm.get('country')?.setValue(event.name);
    this.registrationForm.get('countryCode')?.setValue(event.dialling_code),
    this.selectedCountry=event.dialling_code

  }


  signUp() {
    this.errorMsg = [];
    this.successMsg = '';

    if (this.registrationForm.valid) {
    // Extract form values
    const formValues = this.registrationForm.value;

    
    //this.registerRequest=formValues;
    this.registerRequest = { ...formValues };

    
    //console.log('register REQUEST role  -------->', this.registerRequest.role);
    //console.log('register REQUEST role [0] )  -------->', this.registerRequest.role[0]);



    // Concatenate country code and phone number
    this.registerRequest.phoneNumber1=this.registrationForm.value.phoneNumber1;

    // Extract only the country code if the country field contains extra info
    this.registerRequest.country=this.registerRequest.country.split(' ')[0];

//signup method call from service 

// Call the user service to create a new user
// Call the service with the properly mapped request object
this.userService.createUser(this.registerRequest).subscribe(
  (response: any) => {
    this.successMsg = response.message;
    this.registrationForm.reset(); // Reset the form
  },
  (error) => {
    this.errorMsg = error.error.message;
    console.error("Error during signup:", error);
  }
);
} else {
this.errorMsg = ["Please fill all required fields correctly."];
}


  }
  onSubmit() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      this.signUp();
    }
  }

}
