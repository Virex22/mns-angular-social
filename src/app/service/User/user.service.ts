import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/Article.interface';
import { Commentaire } from 'src/app/interfaces/Commentaire.interface copy';
import { User } from '../../interfaces/User.interfaces';
import { ArticleService } from '../Article/article.service';
import { CommentaireService } from '../Commentaire/commentaire.service';
import { TokenService } from '../Token/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url :string = "https://reseau.jdedev.fr/api/user";
  constructor(
    private http: HttpClient, 
    private router : Router,
    private commentService : CommentaireService,
    private articleService : ArticleService,
    private tokenService : TokenService) { 
    }

  connectUser(email : string, password: string){
    return this.http.post(`${this.url}/connect`,{email,password});
  }
  disconnectUser(){
    this.tokenService.setToken("");
    this.tokenService.setMyUser(undefined);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }
  editUser(user : User){
    let that = this;
    return this.http.put(`${this.url}/${user.id}`,user,{
      headers: {
        "Authorization": `Bearer ${that.tokenService.getToken()}`
      }
    })
  }
  registerUser(user : User){
    return this.http.post(`${this.url}`,{
      ...user
    })
  }
  getUserById(id : number){
    let that = this;
    return this.http.get(`${this.url}/${id}`,{
      headers: {
        "Authorization": `Bearer ${that.tokenService.getToken()}`
      }
    })
  }
  getAllUsers(){
    let that = this;
    return this.http.get(`${this.url}`,{
      headers: {
        "Authorization": `Bearer ${that.tokenService.getToken()}`
      }
    })
  }
  
  deleteUser(id : number,articles : Article[],comment : Commentaire[]){
    articles.forEach(article =>{
      this.articleService.deleteArticle(article.id_article as number);
    })
    comment.forEach(comment =>{
      this.commentService.deleteComment(comment.id_commentaire as number);
    })
    let that = this;
    return this.http.delete(`${this.url}/${id}`,{
      headers: {
        "Authorization": `Bearer ${that.tokenService.getToken()}`
      }
    })
  }
  getAllArticleOfUser(id : number){
    let that = this;
    return this.http.get(`${this.url}/${id}/article`,{
      headers: {
        "Authorization": `Bearer ${that.tokenService.getToken()}`
      }
    })
  }
  getAllCommentOfUser(id : number){
    let that = this;
    return this.http.get(`${this.url}/${id}/comment`,{
      headers: {
        "Authorization": `Bearer ${that.tokenService.getToken()}`
      }
    })
  }
}
