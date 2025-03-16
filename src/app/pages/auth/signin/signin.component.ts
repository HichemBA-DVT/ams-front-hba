import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticationRequest} from '../../../core/models/authentication-request';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  signInForm!: FormGroup;
  showPassword = false;


  authRequest: AuthenticationRequest = {username: '', password: ''};
  errorMsg: Array<string> = [];
  successMsg: string = '';
  invalidLogin = false;


  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private loginservice: AuthenticationService,
  ) {}


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['successMsg']) {
        this.successMsg = params['successMsg'];
      }
    });
    this.initSignInForm();
  }

  initSignInForm(){
    this.signInForm = this.fb.group({
      //email: ['', [Validators.required, Validators.email]],  is replaced by username !!!!!!!!!
      username: ['', [Validators.required]],

      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false]
    });

  }
  signIn() {
    this.errorMsg = [];
    this.authRequest=this.signInForm.value;
    //signin method call from service 
   
    this.loginservice.authenticate(this.authRequest.username, this.authRequest.password).subscribe(
      (data:any) => {
        console.log('im here 1', data);
        this.router.navigate(['/providers']).then(() => {
          this.invalidLogin = false
        });
      },
      (error:any) => {
        this.invalidLogin = true
        console.log('Authentication error:',error)
      }

    
    );

  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
  getRouteByRole(): string {
  
    return '/users';
  }

  
  onSubmit(): void {
    if (this.signInForm.valid) {
      this.signIn();
  }
  }
  



  /*get email() {
    return this.signInForm.get('email');
  }*/

    get username() {
      return this.signInForm.get('username');
    }

  get password() {
    return this.signInForm.get('password');
  }

  get rememberMe() {
    return this.signInForm.get('rememberMe');
  }



}
