import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commentaire } from '../interfaces/Commentaire.interface copy';
import { User } from '../interfaces/User.interfaces';
import { CommentaireService } from '../service/Commentaire/commentaire.service';
import { TokenService } from '../service/Token/token.service';
import { UserService } from '../service/User/user.service';

@Component({
  selector: 'app-commentaire',
  inputs: ['comment'],
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.css']
})
export class CommentaireComponent implements OnInit {

  @Input() comment? : Commentaire;
  public owner? : User;
  
  constructor(private tokenService : TokenService ,public userService :UserService,private router : Router, private commentService : CommentaireService) { }

  ngOnInit(): void {
    let that = this;
    this.userService.getUserById(this?.comment?.id as number).subscribe({
      next(ret){
        that.owner = ret as User;
      }
    })
  }
  
  IAmOwner(){
    return this.tokenService.getMyUser()?.id == this.comment?.id;
  }
  delete(){
    let that = this;
    this.commentService.deleteComment(this.comment?.id_commentaire as number).subscribe({
      next(ret){
        console.log(ret);
        that.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
          that.router.navigateByUrl('/articles');
        }); 
      }
    })
  }
  edit(){
    this.router.navigateByUrl(`comment/edit/${this.comment?.id_commentaire}`);
  }

}
