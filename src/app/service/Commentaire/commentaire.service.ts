import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Commentaire } from 'src/app/interfaces/Commentaire.interface copy';
import { TokenService } from '../Token/token.service';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  private url :string = "https://reseau.jdedev.fr/api/comment";
  
  constructor(private http: HttpClient, private tokenService : TokenService) { 
    
  }

  postComment(comment : Commentaire){
    let that = this;
    return this.http.post(this.url,{...comment},{
      headers: {
        "Authorization": `Bearer ${that.tokenService.getToken()}`
      }
    });
  }

  
  deleteComment(id : number){
    let that = this;
    return this.http.delete(`${this.url}/${id}`,{
      headers: {
        "Authorization": `Bearer ${that.tokenService.getToken()}`
      }
    })
  }
  getCommentById(id : number){
    let that = this;
    return this.http.get(`${this.url}/${id}`,{
      headers: {
        "Authorization": `Bearer ${that.tokenService.getToken()}`
      }
    })
  }
  editComment(comment : Commentaire){
    let that = this;
    return this.http.put(`${this.url}/${comment.id_commentaire}`,comment,{
      headers: {
        "Authorization": `Bearer ${that.tokenService.getToken()}`
      }
    })
  }
}
