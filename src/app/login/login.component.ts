import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../interfaces/User.interfaces';
import { TokenService } from '../service/Token/token.service';
import { UserService } from '../service/User/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm :FormGroup;
  showError = {
    email : false,
    password : false,
    incorrect : false
  };

  constructor(private tokenService : TokenService,formBuilder : FormBuilder,private userService : UserService,private router : Router) { 
    this.userForm = formBuilder.group({
      email: new FormControl("",[
        Validators.required,
        Validators.email,
        Validators.minLength(3),
      ]),
      password: new FormControl("",[
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/)
      ]),
    })
  }

  ngOnInit(): void {

  }
  validForm():void {
    this.showError.incorrect = false;
    if (!this.userForm.valid){
      this.showError.email = !(this.userForm.get("email")?.valid);
      this.showError.password = !(this.userForm.get("password")?.valid);
      return;
    }
    let that = this;
    this.userService.connectUser(this.userForm.value.email,this.userForm.value.password).subscribe({
      next(ret){
        console.log((ret as User).token, "stored");
        that.tokenService.setToken((ret as User).token as string);
        that.tokenService.setMyUser((ret as User));
        that.router.navigateByUrl("articles");
      },
      error(err){
        that.showError.incorrect = true
      }
    });

  }
}
