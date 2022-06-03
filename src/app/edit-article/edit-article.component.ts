import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../interfaces/Article.interface';
import { ArticleService } from '../service/Article/article.service';
import { UserService } from '../service/User/user.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  private id_article? : number;
  public article? : Article;
  public loaded : boolean;
  articleForm : FormGroup;
  showError = {
    titre : false,
    message : false
  }


  constructor(
    private activeRoute : ActivatedRoute, 
    private userService : UserService,
    private articleService : ArticleService,
    private formBuilder : FormBuilder,
    private router : Router
    ) {
      this.loaded = false;
      this.articleForm = formBuilder.group({});
      let that = this;
      this.id_article = +(this.activeRoute.snapshot.paramMap.get('id')as string);
      this.articleService.getArticle(this.id_article).subscribe({
        next(ret){
          that.article = ret as Article;
          
          that.articleForm = that.formBuilder.group({
            titre: new FormControl(that.article.titre,[
              Validators.required,
              Validators.minLength(3),
            ]),
            message: new FormControl(that.article.contenu,[
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
    this.showError.titre = !this.articleForm.get("titre")?.valid as boolean;
    this.showError.message = !this.articleForm.get("message")?.valid as boolean;
    if (this.articleForm.valid) {
      this.articleService.editArticle({
        titre : this.articleForm.value.titre,
        contenu: this.articleForm.value.message,
        id_article:this.article?.id_article
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
