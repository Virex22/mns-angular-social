import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../interfaces/User.interfaces';
import { CommentaireService } from '../service/Commentaire/commentaire.service';
import { UserService } from '../service/User/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public loaded : boolean;
  private id : number;
  private user? : User;
  public userForm : FormGroup;
  public showError ={
    email : false,
    pseudo : false,
    password : false,
  }

  constructor(
    private activeRoute : ActivatedRoute, 
    private userService : UserService,
    private commentService : CommentaireService,
    private formBuilder : FormBuilder,
    private router : Router
    ) { 
      this.loaded = false;
      this.userForm = formBuilder.group({});
      let that = this;
      this.id = +(this.activeRoute.snapshot.paramMap.get('id')as string);
      this.userService.getUserById(this.id).subscribe({
        next(ret){
          that.user = ret as User;
          
          that.userForm = that.formBuilder.group({
            pseudo: new FormControl(that.user.pseudo,[
              Validators.required,
              Validators.minLength(3),
            ]),
            email: new FormControl(that.user.email,[
              Validators.required,
              Validators.email,
            ]),
            password: new FormControl("",[
              Validators.required,
              Validators.minLength(3),
              Validators.pattern(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/)
            ]),
          })
          that.loaded = true;
        }
      })
    }

  ngOnInit(): void {
  }
  validForm(){
    let that = this;
    this.showError.pseudo = !this.userForm.get("pseudo")?.valid as boolean;
      if (this.userForm.valid) {
        this.userService.editUser({
          pseudo: this.userForm.value.pseudo,
          email : this.userForm.value.email,
          password : this.userForm.value.password,
          avatar : this.user?.avatar ?? "",
          id :this.user?.id
        }).subscribe({
          next(ret){
            console.log(ret);
            that.router.navigateByUrl(`profil/${that.user?.id}`);
          }
        });
    }
  }
}
