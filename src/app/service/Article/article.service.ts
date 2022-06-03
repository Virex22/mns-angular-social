import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from 'src/app/interfaces/Article.interface';
import { TokenService } from '../Token/token.service';
import { UserService } from '../User/user.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private url :string = "https://reseau.jdedev.fr/api/article";
  
  constructor(private http: HttpClient, private tokenService : TokenService) { 
    
  }

  getAllArticles(){
    let that = this;
    return this.http.get(this.url,{
      headers: {
        "Authorization": `Bearer ${that.tokenService.getToken()}`
      }
    })
  }
  getCommentsFromArticle(idArticle : number){
    let that = this;
    return this.http.get(`${this.url}/${idArticle}/comment`,{
      headers: {
        "Authorization": `Bearer ${that.tokenService.getToken()}`
      }
    })
  }
  getArticle(id : number){
    let that = this;
    return this.http.get(`${this.url}/${id}`,{
      headers: {
        "Authorization": `Bearer ${that.tokenService.getToken()}`
      }
    })
  }
  deleteArticle(id : number){
    let that = this;
    return this.http.delete(`${this.url}/${id}`,{
      headers: {
        "Authorization": `Bearer ${that.tokenService.getToken()}`
      }
    })
  }
  postArticle(article : Article){
    let that = this;
    this.http.post(`${this.url}`,article,{
      headers: {
        "Authorization": `Bearer ${that.tokenService.getToken()}`
      }
    }).subscribe({
      next(ret){
        console.log(ret)
      },
    })
  }
  editArticle(article : Article){
    let that = this;
    return this.http.put(`${this.url}/${article.id_article}`,article,{
      headers: {
        "Authorization": `Bearer ${that.tokenService.getToken()}`
      }
    });
  }
}
