import { ASTWithSource } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../interfaces/Article.interface';
import { ArticleService } from '../service/Article/article.service';
import {User} from "../interfaces/User.interfaces";
import { UserService } from '../service/User/user.service';
import { Commentaire } from '../interfaces/Commentaire.interface copy';
import {  Router } from '@angular/router';
import { TokenService } from '../service/Token/token.service';
@Component({
  selector: 'app-article',
  inputs:['article'],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input() public article? : Article;
  public owner? : User;
  public comments? : Commentaire[];

  constructor(private tokenService : TokenService,private userService : UserService,private articleService : ArticleService, private router: Router){
    
  }
  ngOnInit(): void {
    let that = this;
    
    this.userService.getUserById(this.article?.id as number).subscribe({
      next(ret){
        that.owner = ret as User;
      }
    });
    this.articleService.getCommentsFromArticle(this.article?.id_article as number).subscribe({
      next(ret){
        that.comments = ret as Commentaire[];
      }
    });
  }
  IAmOwner(){
    return this.tokenService.getMyUser()?.id == this.article?.id;
  }
  delete(){
    let that = this;
    this.articleService.deleteArticle(this.article?.id_article as number).subscribe({
      next(ret){
        that.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
          that.router.navigateByUrl('/articles');
        }); 
      }
    })
  }
  goToEditArticle(){
    this.router.navigateByUrl(`/article/edit/${this.article?.id_article}`); 
  }

}
