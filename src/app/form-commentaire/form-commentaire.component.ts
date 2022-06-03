import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommentaireService } from '../service/Commentaire/commentaire.service';
import { TokenService } from '../service/Token/token.service';
import { UserService } from '../service/User/user.service';

@Component({
  selector: 'app-form-commentaire',
  templateUrl: './form-commentaire.component.html',
  styleUrls: ['./form-commentaire.component.css']
})
export class FormCommentaireComponent implements OnInit {
  @Input() idArticle? : number;
  commentForm : FormGroup;
  public showError = {
    message : false,
  }
  constructor(formBuilder : FormBuilder,private tokenService : TokenService ,private commentService : CommentaireService, private userService : UserService, private router : Router) {
    this.commentForm = formBuilder.group({
      message: new FormControl("",[
        Validators.required,
        Validators.minLength(3),
      ]),
    })
   }

  ngOnInit(): void {
  }
  
  validForm(){
    let that = this;
    this.showError.message = !this.commentForm.get("message")?.valid as boolean;
    if (this.commentForm.valid) {
      this.commentService.postComment({
        contenu : this.commentForm.value.message,
        creation : new Date(),
        idArt : this.idArticle as number,
        id : that.tokenService.getMyUser()?.id as number
      }).subscribe({
        next(ret){
          that.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
            that.router.navigateByUrl('/articles');
          }); 
        }
      });
    }
  }

}
