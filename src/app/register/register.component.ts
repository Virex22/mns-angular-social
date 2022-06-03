import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/User/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm :FormGroup;
  showError = {
    email : false,
    pseudo: false,
    password : false,
    passwordConfirm : false
  };

  constructor(formBuilder : FormBuilder, private userService : UserService,private router : Router) { 
    this.userForm = formBuilder.group({
      pseudo:  new FormControl("",[
        Validators.minLength(3)
      ]),
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
      passwordConfirm : "" as string
    })
  }

  ngOnInit(): void {
  }
  validForm() : void {
    let that = this;
    if (!this.userForm.valid){
      this.showError.email = !(this.userForm.get("email")?.valid);
      this.showError.password = !(this.userForm.get("password")?.valid);
      this.showError.passwordConfirm = this.userForm.value.passwordConfirm != this.userForm.value.password;
      this.showError.pseudo = !(this.userForm.get("pseudo")?.valid);
      return;
    }
    this.userService.registerUser({
      email : this.userForm.value.email,
      password: this.userForm.value.password,
      pseudo: this.userForm.value.pseudo,
      avatar:"",
    }).subscribe({
      next(ret){
        that.router.navigateByUrl("/login");
      }
    });

  }
}
