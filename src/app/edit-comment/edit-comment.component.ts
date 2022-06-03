import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Commentaire } from '../interfaces/Commentaire.interface copy';
import { CommentaireService } from '../service/Commentaire/commentaire.service';
import { UserService } from '../service/User/user.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {

  commentForm : FormGroup;
  comment? : Commentaire;
  public loaded : boolean;
  private id_comment? : number;
  public showError = {
    message : false,
  }

  constructor(
    private activeRoute : ActivatedRoute, 
    private userService : UserService,
    private commentService : CommentaireService,
    private formBuilder : FormBuilder,
    private router : Router
    ) { 
      this.loaded = false;
      this.commentForm = formBuilder.group({});
      let that = this;
      this.id_comment = +(this.activeRoute.snapshot.paramMap.get('id')as string);
      this.commentService.getCommentById(this.id_comment).subscribe({
        next(ret){
          that.comment = ret as Commentaire;
          
          that.commentForm = that.formBuilder.group({
            message: new FormControl(that.comment.contenu,[
              Validators.required,
              Validators.minLength(3),
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
    this.showError.message = !this.commentForm.get("message")?.valid as boolean;
    if (this.commentForm.valid) {
      this.commentService.editComment({
        contenu: this.commentForm.value.message,
        id_commentaire:this.comment?.id_commentaire
      }).subscribe({
        next(){
          that.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
            that.router.navigateByUrl('/articles');
          });
        }
      });
      
    }
  }

}
