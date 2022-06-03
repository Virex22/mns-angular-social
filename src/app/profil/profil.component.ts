import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../interfaces/Article.interface';
import { Commentaire } from '../interfaces/Commentaire.interface copy';
import { User } from '../interfaces/User.interfaces';
import { TokenService } from '../service/Token/token.service';
import { UserService } from '../service/User/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  private id? : number;
  public loaded : boolean;
  public user? : User;
  public comments? : Commentaire[];
  public articles? : Article[];

  constructor(private router : Router,private activeRoute : ActivatedRoute,private tokenService : TokenService ,private userService : UserService) {
    this.loaded = false;
  }

  ngOnInit(): void {
    let that = this;
    this.id = +(this.activeRoute.snapshot.paramMap.get('id')as string);
    this.userService.getUserById(this.id).subscribe({
      next(ret){
        that.user = ret as User
        that.initCommentAndArticle();
        that.loaded=true;
      }
    })
  }
  initCommentAndArticle(){
    let that = this;
    this.userService.getAllArticleOfUser(this.id as number).subscribe({
      next(ret){
        that.articles = ret as Article[]
      }
    })
    this.userService.getAllCommentOfUser(this.id as number).subscribe({
      next(ret){
        that.comments = ret as Commentaire[];
      }
    })
  }
  myProfile(){
    return this.id == this.tokenService.getMyUser()?.id;
  }
  delete(){
    let that = this;
    this.userService.deleteUser(this.id as number,this.articles as Article[],this.comments as Commentaire[]).subscribe({
      next(ret){
        console.log(ret);
        that.userService.disconnectUser();
      }
    })
  }
  edit(){
    this.router.navigateByUrl(`/profil/edit/${this.user?.id}`);
  }

}
